/*jslint browser: true */
/*global $ */
var appData = {};
appData.placeholderText = '%data%'; //common replacement string


//////////////////////////////////////////
// Load the raw bio data for the resume //
//////////////////////////////////////////
/**
 * object containing general biographical information for the resume
 *
 * @type {Object}
 *
 * The Front-End Developer nanodegree course style guide
 * http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html
 * says to use single quotes for JavaScript strings, but double quotes are required
 * for json.
 */
appData.bio = {
    "name" : "H. Phil Duby",
    "role" : "Web Developer",
    "contact" : {
        "voice" : {
            "mobile" : "(403) 993-2607",
            "land" : "(403) 456-6104",
            "work" : "undefined",
            "skype" : "x"
        },
        "mobile" : "(403) 993-2607",
        "email" : "philduby@phriendly.net",
        "github" : "mMerlin",
        "twitter" : "H. Phil Duby",
        "location" : "Calgary, AB, Canada",
        "postal" : {
            "Country" : "Canada",
            "city" : "Calgary",
            "stateProv" : "AB",
            "zipPostal" : "T3B 4N3",
            "street1" : "27 Silversprings Drive NW",
            "street2" : "Unit 66"
        }
    },
    "welcomeMessage" : "Thank-you for visiting my web page.",
    "skills" : ["programming", "analysis", "desktop support"],
    "picUrl" : "images/biopic.jpg"
};
//"skills" : html, css, javascript, jQuery, bootstrap, JSON
// framework, library, language, data format


////////////////////////////
// load Work History data //
////////////////////////////
/**
 * jobs in work history
 *
 * UDACITY > Javascript Basic > Lesson 1 - Data Types >
 *   All the Resume Sections Quiz
 *
 * @type {Object}
 *
 * The styleguide says to use string concatenation to break long lines, but
 * that is not valid when complying with JSON syntax.
 */
appData.work = {
    "jobs" : [
        {
            "employer" : "GDM",
            "title" : "Contract Programmer Analyst",
            "location" : "Calgary, AB, Canada",
            "dates" : "2011 - 2012",
            "description" : "Repair and rebuild of contract management web application"
        },
        {
            "employer" : "The Lambda Geek",
            "title" : "Owner / Operator",
            "location" : "Calgary, AB, Canada",
            "dates" : "2009",
            "description" : "Computer sales with hardware and desktop support"
        },
        {
            "employer" : "Shaw Cablesystems",
            "title" : "Senior Software Developer",
            "location" : "Calgary, AB, Canada",
            "dates" : "2002 - 2008",
            "description" : "Web site application support, Data conversion and green screen application support"
        },
        {
            "employer" : "Donortrust",
            "title" : "Volunteer Programmer",
            "location" : "Calgary, AB, Canada",
            "dates" : "2006 - 2007",
            "description" : "Work with the group doing design and development of the Donortrust applications to support the Christmas Future web site"
        },
        {
            "employer" : "Nortel Networks",
            "title" : "Contract Programmer Analyst",
            "location" : "Calgary, AB, Canada",
            "dates" : "1997 - 2001",
            "description" : "Business appliction Y2K conversion and support"
        },
        {
            "employer" : "TransAlta Utilities",
            "title" : "Contract Programmer Analyst",
            "location" : "Calgary, AB, Canada",
            "dates" : "1994 - 1997",
            "description" : "Application support"
        },
        {
            "employer" : "Rhyason Consultants",
            "title" : "Contract Programmer",
            "location" : "Calgary, AB, Canada",
            "dates" : "1993 - 1994",
            "description" : "Oilwell Log Chart analysis Application conversion"
        },
        {
            "employer" : "Hydro Mississauga",
            "title" : "Contract Programmer Analyst",
            "location" : "Mississauga, ON, Canada",
            "dates" : "1992 - 1993",
            "description" : "GIS application development"
        },
        {
            "employer" : "MONENCO Information Systems Inc",
            "title" : "System Analyst",
            "location" : "Calgary, AB, Canada",
            "dates" : "1983 - 1992",
            "description" : "CADD system application development and support"
        },
        {
            "employer" : "Western Canada Summer Games 1983",
            "title" : "Contract Programmer",
            "location" : "Calgary, AB, Canada",
            "dates" : "1983 - 1983",
            "description" : "Results network reporting development and support"
        },
        {
            "employer" : "Western Cooperative Fertilizers, Ltd",
            "title" : "Computer Programmer",
            "location" : "Calgary, AB, Canada",
            "dates" : "1980 - 1983",
            "description" : "Business application conversion and development"
        },
        {
            "employer" : "CIBC",
            "title" : "MICR Sorter Operator",
            "location" : "Calgary, AB, Canada",
            "dates" : "1975 - 1980",
            "description" : "Operation of cheque sorter equipment at bank data centre"
        }
    ]
};

//////////////////////////////
// Load project information //
//////////////////////////////
/**
 * Featured projects for the resume
 *
 * UDACITY > Javascript Basic > Lesson 1 - Data Types >
 *   All the Resume Sections Quiz
 *
 * @type {Object}
 */
appData.projects = {
    "projects" : [
        {
            "title" : "Page Mockup",
            "dates" : "2014",
            "description" : "create web page using bootstrap framework to match provided mockup image",
            "images" : [""]
        }
    ]
};

//////////////////////////////
// load School History data //
//////////////////////////////
/**
 * Schools with cities, majors, minors, dates and online course information
 *
 * UDACITY > Javascript Basic > Lesson 1 - Data Types >
 *   Validating JSON Quiz
 * @type {Object}
 */
appData.Education = {
    "schools": [
        {
            "name": "SAIT",
            "location": "Calgary, AB, Canada",
            "degree": "none",
            "majors": ["selected CS courses", "Technical Programming Certificate"],
            "dates": "1980,1983",
            "url": "http://www.sait.ca/"
        },
        {
            "name": "U of C",
            "location": "Calgary, AB, Canada",
            "degree": "none",
            "majors": ["selected CS courses"],
            "dates": 1982,
            "url": "http://ucalgary.ca/"
        }
    ],
    "onlineCourses": [
        {
            "school": "Udacity",
            "title": "Front-End Web Developer NanoDegree",
            "dates": 2015,
            "url": "https://www.udacity.com/course/nd001"
        },
        {
            "school": "Udacity",
            "title": "Artificial Intelligence for Robotics",
            "dates": 2012,
            "url": "https://www.udacity.com/course/cs373"
        },
        {
            "title": "Introduction to Computer Science",
            "school": "Udacity",
            "dates": 2012,
            "url": "https://www.udacity.com/course/cs101"
        }
    ]
};


/**
 * Add a single skill entry to the page
 * @param  {string} singleSkill The name/description for a single skill
 * @return {undefined}
 */
appData.showSkill = function (singleSkill) {
    "use strict";
    /*global HTMLskills */
    $('#skills').append(HTMLskills.replace(appData.placeholderText,
        singleSkill
        ));
};//End appData.showSkill(skill)

/**
 * Add the skills summary to the header, when any skills are provided in the
 * bio data
 * @param  {object} bio biography attributes for resume
 * @return {undefined}
 */
appData.showAllSkills = function (bio) {
    "use strict";
    /*global HTMLskillsStart */
    if (bio && bio.skills && bio.skills.length > 0) {
        $('#header').append(HTMLskillsStart);
        bio.skills.forEach(appData.showSkill);//append all skills listed
    }
};//End appData.showAllSkills(bio)

appData.showAllSkills(appData.bio);
//appData.populatePage();

//appData.resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(placeholderText, me.name);
