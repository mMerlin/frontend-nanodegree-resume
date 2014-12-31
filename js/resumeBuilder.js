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
    var wrk_entry = {};
    wrk_entry.employer = histEmployer;
    wrk_entry.title = histTitle;
    wrk_entry.location = histLocation;
    wrk_entry.dates = histDates;
    if (histDescription !== 'undefined') {
        wrk_entry.description = histDescription;
    }
    appData.work.push(wrk_entry);//Add one employment history to exisiting array

};
/*
appData.work.push({});
appData.idx = appData.work.length - 1;
appData.wrk = appData.work[appData.idx];
appData.wrk.employer = 'GDM';
appData.wrk.title = 'Contract Programmer Analyst';
appData.wrk.location = 'Calgary';
appData.wrk.dates = '2011 - 2012';
appData.wrk.description = 'Repair and rebuild of contract management web application';
*/

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
    var sch_entry = {};
    //JSLint will complain about bracket notation, but the lesson asks for it
    sch_entry['institute'] = histSchool;
    sch_entry['location'] = histLocation;
    sch_entry['dates'] = histDates;
    if (histDegree !== 'undefined') {
        sch_entry['degree'] = histDegree;
    }
    if (histMajor !== 'undefined') {
        sch_entry['major'] = histMajor;
    }
    appData.schools.push(sch_entry);//Add school history object to exisiting array
};
/*
appData.schools.push({});//Add school history object to exisiting array
appData.idx = appData.schools.length - 1;//Last, just added array entry
appData.wrk = appData.schools[appData.idx];//The brand new empty object
appData.schools[appData.idx]['institute'] = 'SAIT';
appData.wrk['location'] = 'Calgary';
appData.wrk['dates'] = '1976 - 1980';
appData.wrk['degree'] = 'Computer Science';
appData.wrk['major'] = 'selected courses';
*/

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
    var wrk_entry;
    $('#workExperience').append(HTMLworkStart);
    //appData.addWork($('#workExperience').last(), appData.work[0]);
//JSLint will complain about bracket notation here, but the lesson asks for it
    wrk_entry = $('.work-entry').last(); //Just added above
    wrk_entry.append(HTMLworkEmployer.replace(appData.placeholderText,
        workInstance['employer']
        ));
    wrk_entry.append(HTMLworkLocation.replace(appData.placeholderText,
        workInstance['location']
        ));
    wrk_entry.append(HTMLworkDates.replace(appData.placeholderText,
        workInstance['dates']
        ));
    wrk_entry.append(HTMLworkTitle.replace(appData.placeholderText,
        workInstance['title']
        ));
    if (workInstance['description']) {
        wrk_entry.append(HTMLworkDescription.replace(appData.placeholderText,
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
    var edu_entry;
    $('#education').append(HTMLschoolStart);
    edu_entry = $('.education-entry').last(); //Just added above
    edu_entry.append(HTMLschoolName.replace(appData.placeholderText,
        schoolInstance.institute
        ));
    edu_entry.append(HTMLschoolLocation.replace(appData.placeholderText,
        schoolInstance.location
        ));
    edu_entry.append(HTMLschoolDates.replace(appData.placeholderText,
        schoolInstance.dates
        ));
    if (schoolInstance.degree) {
        edu_entry.append(HTMLschoolName.replace(appData.placeholderText,
            schoolInstance.degree
            ));
        if (schoolInstance.major) {
            edu_entry.append(HTMLschoolMajor.replace(appData.placeholderText,
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
        bio.pic_url
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
        bio.welcome_message
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
        'location' : 'Calgary',
        'postal' : {
            'Country' : 'Canada',
            'city' : 'Calgary',
            'state_prov' : 'AB',
            'zip_pc' : 'T3B 4N3',
            'street_1' : '27 Silversprings Drive NW',
            'street_2' : 'Unit 66'
        }
    },
    'avatar' : '',
    'welcome_message' : 'Thank-you for visiting my web page.',
    'skills' : ['programming', 'analysis', 'desktop support'],
    'pic_url' : 'images/biopic.jpg'
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
    'Calgary',
    '2011 - 2012',
    'Repair and rebuild of contract management web application'
    );
appData.loadWorkHistory('The Lambda Geek',
    'Owner / Operator',
    'Calgary',
    '2009 - 2009',
    'Computer sales and support'
    );
appData.loadWorkHistory('Shaw Cablesystems',
    'Senior Software Developer',
    'Calgary',
    '2002 - 2008',
    'Web site application support, Data conversion and green screen '
        + 'application support'
    );
appData.loadWorkHistory('Donortrust',
    'Volunteer Programmer',
    'Calgary',
    '2006 - 2007',
    'Work with the group doing design and development of the Donortrust ' +
        'applications to support the Christmas Future web site'
    );
appData.loadWorkHistory('Nortel Networks',
    'Contract Programmer Analyst',
    'Calgary',
    '1997 - 2001'
    );
appData.loadWorkHistory('TransAlta Utilities',
    'Contract Programmer Analyst',
    'Calgary',
    '1994 - 1997'
    );
appData.loadWorkHistory('Rhyason Consultants',
    'Contract Programmer',
    'Calgary',
    '1993 - 1994'
    );
appData.loadWorkHistory('Hydro Mississauga',
    'Contract Programmer Analyst',
    'Mississauga',
    '1992 - 1993'
    );
appData.loadWorkHistory('MONENCO Information Systems Inc',
    'System Analyst',
    'Calgary',
    '1983 - 1992'
    );
appData.loadWorkHistory('Western Canada Summer Games 1983',
    'Contract Programmer',
    'Calgary',
    '1983 - 1983'
    );
appData.loadWorkHistory('Western Cooperative Fertilizers, Ltd',
    'Computer Programmer',
    'Calgary',
    '1980 - 1983'
    );
appData.loadWorkHistory('CIBC',
    'MICR Sorter Operator',
    'Calgary',
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
    'Calgary',
    '1976 - 1980',
    'Computer Science',
    'selected courses'
    );
appData.loadSchoolHistory('U of C',
    'Calgary',
    '1976 - 1982',
    'Computer Science',
    'selected courses'
    );
appData.loadSchoolHistory('SAIT',
    'Calgary',
    '1981 - 1983',
    'Computer Science',
    'Technical Programming Certificate'
    );


//ONLINE
// TODO: alternative to 'class', which is a js keyword
//appData.wrk['class'] = 'Adobe Flash CS5';

appData.populatePage();

//appData.resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(placeholderText, me.name);
