/*jslint browser: true */
/*global $ */
var appData = {};

////////////////////////////////
// Local Function Definitions //
////////////////////////////////

/**
 * Fill in a new work history object, and add it to the array.
 * @param  {string}
 * @param  {string}
 * @param  {string}
 * @param  {string}
 * @param  {string}
 * @param  {string}
 */
appData.loadWorkHistory = function (histEmployer, histTitle, histLocation,
    histDates, histDescription) {
    "use strict";
    var wrkEntry = {};
    wrkEntry.employer = histEmployer;
    wrkEntry.title = histTitle;
    wrkEntry.location = histLocation;
    wrkEntry.dates = histDates;
    if (histDescription !== 'undefined') {
        wrkEntry.description = histDescription;
    }
    /*
    .dates ==> .years //run length versus start and end
    .title ==> .position //is position a standard js/DOM attribute?
     */
    appData.work.push(wrkEntry);//Add one employment history to exisiting array
};

/**
 * Fill in a new school history object, and add it to the array.
 * @param  {string}
 * @param  {string}
 * @param  {string}
 * @param  {string}
 * @param  {string}
 * @return {[type]}
 */
appData.loadSchoolHistory = function (histSchool, histLocation, histDates,
    histDegree, histMajor) {
    "use strict";
    var schEntry = {};
    //JSLint will complain about bracket notation, but the lesson asks for it
    schEntry['institute'] = histSchool;
    schEntry['location'] = histLocation;
    schEntry['dates'] = histDates;
    if (histDegree !== 'undefined') {
        schEntry['degree'] = histDegree;
    }
    if (histMajor !== 'undefined') {
        schEntry['major'] = histMajor;
    }
    /*
    .institute ==> .name
    .location ==> .city
    .dates ==> .years
     */
    appData.schools.push(schEntry);//Add school history object to exisiting array
};

/**
 * Add a single skill entry to the page
 * @param {string}
 */
appData.addSkill = function (singleSkill) {
    "use strict";
    /*global HTMLskills */
    $('#skills').append(HTMLskills.replace(appData.placeholderText,
        singleSkill
        ));
};

/**
 * Add all details for a single work experience to the page
 * @param {[object]}
 */
appData.addExperience = function (workInstance) {
    "use strict";
    /*global HTMLworkStart, HTMLworkEmployer, HTMLworkTitle, HTMLworkDates,
        HTMLworkLocation, HTMLworkDescription */
    var wrkEntry;
    $('#workExperience').append(HTMLworkStart);
    //appData.addWork($('#workExperience').last(), appData.work[0]);
//JSLint will complain about bracket notation here, but the lesson asks for it
    wrkEntry = $('.work-entry').last(); //Just added above
    wrkEntry.append(HTMLworkEmployer.replace(appData.placeholderText,
        workInstance['employer']
        ));
    wrkEntry.append(HTMLworkLocation.replace(appData.placeholderText,
        workInstance['location']
        ));
    wrkEntry.append(HTMLworkDates.replace(appData.placeholderText,
        workInstance['dates']
        ));
    wrkEntry.append(HTMLworkTitle.replace(appData.placeholderText,
        workInstance['title']
        ));
    if (workInstance['description']) {
        wrkEntry.append(HTMLworkDescription.replace(appData.placeholderText,
            workInstance['description']
            ));
    }
};

/**
 * Add all details for a single school to the page education information
 * @param {object}
 */
appData.addSchool = function (schoolInstance) {
    "use strict";
    /*global HTMLschoolStart, HTMLschoolName, HTMLschoolDegree,
        HTMLschoolDates, HTMLschoolLocation, HTMLschoolMajor */
    var eduEntry;
    $('#education').append(HTMLschoolStart);
    eduEntry = $('.education-entry').last(); //Just added above
    eduEntry.append(HTMLschoolName.replace(appData.placeholderText,
        schoolInstance.institute
        ));
    eduEntry.append(HTMLschoolLocation.replace(appData.placeholderText,
        schoolInstance.location
        ));
    eduEntry.append(HTMLschoolDates.replace(appData.placeholderText,
        schoolInstance.dates
        ));
    if (schoolInstance.degree) {
        eduEntry.append(HTMLschoolName.replace(appData.placeholderText,
            schoolInstance.degree
            ));
        if (schoolInstance.major) {
            eduEntry.append(HTMLschoolMajor.replace(appData.placeholderText,
                schoolInstance.major
                ));
        }
    }
};

/**
 * Merge the resume data into the web page
 */
appData.populatePage = function () {
    "use strict";
    /*global $, HTMLheaderName, HTMLheaderRole, HTMLemail, HTMLmobile,
        HTMLcontactGeneric, HTMLWelcomeMsg, HTMLskillsStart, HTMLbioPic,
        HTMLworkStart, HTMLworkEmployer, HTMLworkTitle, HTMLschoolStart,
        HTMLschoolName */
    var bio;
    bio = appData.bio;

    // TODO: Idea: streamline this by moving sections to their own functions.
    $('#header').prepend(HTMLheaderRole.replace(appData.placeholderText,
        bio.role
        ));
    $('#header').prepend(HTMLheaderName.replace(appData.placeholderText,
        bio.name
        ));
    $('#header').prepend(HTMLbioPic.replace(appData.placeholderText,
        bio.picUrl
        ));
    $('#topContacts').append(HTMLemail.replace(appData.placeholderText,
        bio.contact.email
        ));
    $('#topContacts').append(HTMLmobile.replace(appData.placeholderText,
        bio.contact.phone.mobile
        ));
    $('#topContacts').append(HTMLcontactGeneric.replace(appData.placeholderText,
        bio.contact.github).replace('%contact%', 'GitHub'
        ));
    $('#footerContacts').append(HTMLemail.replace(appData.placeholderText,
        bio.contact.email
        ));
    $('#footerContacts').append(HTMLmobile.replace(appData.placeholderText,
        bio.contact.phone.mobile
        ));
    $('#footerContacts').append(HTMLcontactGeneric.replace(appData.placeholderText,
        bio.contact.github).replace('%contact%', 'GitHub'
        ));

    $('#header').append(HTMLWelcomeMsg.replace(appData.placeholderText,
        bio.welcomeMessage
        ));
    $('#header').append(HTMLskillsStart);
    bio.skills.forEach(appData.addSkill);//Show details for each skill
    appData.work.forEach(appData.addExperience);//Show details for each work event
    appData.schools.forEach(appData.addSchool);//Show details for each school
};


//////////////////////////////
// Load the raw resume data //
//////////////////////////////
appData.placeholderText = '%data%'; //common replacement string
appData.bio = {
    'name' : 'H. Phil Duby',
    'role' : 'Web Developer',
    'contact' : {
        'phone' : {
            'mobile' : '(403) 993-2607',
            'land' : '(403) 456-6104',
            'work' : undefined
        },
        'email' : 'philduby@phriendly.net',
        'github' : 'https://github.com/mMerlin',
        'location' : 'Calgary, AB, Canada',
        'postal' : {
            'Country' : 'Canada',
            'city' : 'Calgary',
            'stateProv' : 'AB',
            'zipPostal' : 'T3B 4N3',
            'street1' : '27 Silversprings Drive NW',
            'street2' : 'Unit 66'
        }
    },
    'avatar' : '',
    'welcomeMessage' : 'Thank-you for visiting my web page.',
    'skills' : ['programming', 'analysis', 'desktop support'],
    'picUrl' : 'images/biopic.jpg'
};

////////////////////////////
// load Work History data //
////////////////////////////
appData.work = [];
/*
appData.loadWorkHistory('employer',
    'title',
    'location',
    'dates',
    'description'
    );
*/
appData.loadWorkHistory('GDM',
    'Contract Programmer Analyst',
    'Calgary, AB, Canada',
    '2011 - 2012',
    'Repair and rebuild of contract management web application'
    );
appData.loadWorkHistory('The Lambda Geek',
    'Owner / Operator',
    'Calgary, AB, Canada',
    '2009 - 2009',
    'Computer sales and support'
    );
appData.loadWorkHistory('Shaw Cablesystems',
    'Senior Software Developer',
    'Calgary, AB, Canada',
    '2002 - 2008',
    'Web site application support, Data conversion and green screen '
        + 'application support'
    );
appData.loadWorkHistory('Donortrust',
    'Volunteer Programmer',
    'Calgary, AB, Canada',
    '2006 - 2007',
    'Work with the group doing design and development of the Donortrust ' +
        'applications to support the Christmas Future web site'
    );
appData.loadWorkHistory('Nortel Networks',
    'Contract Programmer Analyst',
    'Calgary, AB, Canada',
    '1997 - 2001'
    );
appData.loadWorkHistory('TransAlta Utilities',
    'Contract Programmer Analyst',
    'Calgary, AB, Canada',
    '1994 - 1997'
    );
appData.loadWorkHistory('Rhyason Consultants',
    'Contract Programmer',
    'Calgary, AB, Canada',
    '1993 - 1994'
    );
appData.loadWorkHistory('Hydro Mississauga',
    'Contract Programmer Analyst',
    'Mississauga, ON, Canada',
    '1992 - 1993'
    );
appData.loadWorkHistory('MONENCO Information Systems Inc',
    'System Analyst',
    'Calgary, AB, Canada',
    '1983 - 1992'
    );
appData.loadWorkHistory('Western Canada Summer Games 1983',
    'Contract Programmer',
    'Calgary, AB, Canada',
    '1983 - 1983'
    );
appData.loadWorkHistory('Western Cooperative Fertilizers, Ltd',
    'Computer Programmer',
    'Calgary, AB, Canada',
    '1980 - 1983'
    );
appData.loadWorkHistory('CIBC',
    'MICR Sorter Operator',
    'Calgary, AB, Canada',
    '1975 - 1980'
    );

//////////////////////////////
// load School History data //
//////////////////////////////
appData.schools = [];
/*
appData.loadSchoolHistory('school',
    'locaiton',
    'dates',
    'degree',
    'majore'
    );
*/
appData.loadSchoolHistory('SAIT',
    'Calgary, AB, Canada',
    '1976 - 1980',
    'Computer Science',
    'selected courses'
    );
appData.loadSchoolHistory('U of C',
    'Calgary, AB, Canada',
    '1976 - 1982',
    'Computer Science',
    'selected courses'
    );
appData.loadSchoolHistory('SAIT',
    'Calgary, AB, Canada',
    '1981 - 1983',
    'Computer Science',
    'Technical Programming Certificate'
    );

/**
 * Schools with cities, majors, minors, graduation years and online course
 * information
 *
 * The Front-End Developer nanodegree course style guide
 * http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html
 * says to use single quotes for JavaScript strings, but double quotes are required
 * for json.
 *
 * UDACITY > Javascript Basic > Lesson 1 - Data Types >
 *   Validating JSON Quiz
 * @type {Object}
 */
appData.Education = [
    {
        "institute": "SAIT",
        "location": "Calgary, AB, Canada",
        "graduation": "1980",
        "degree": "Computer Science",
        "major": "selected courses"
    },
    {
        "institute": "U of C",
        "location": "Calgary, AB, Canada",
        "graduation": "1982",
        "degree": "Computer Science",
        "major": "selected courses"
    },
    {
        "institute": "SAIT",
        "location": "Calgary, AB, Canada",
        "graduation": "1983",
        "degree": "Computer Science",
        "major": "Technical Programming Certificate"
    }
];
//appData.Education = {"schools": []}

//ONLINE
// TODO: alternative to 'class', which is a js keyword
//appData.wrk['class'] = 'Adobe Flash CS5';

appData.populatePage();

//appData.resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(placeholderText, me.name);
