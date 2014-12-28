/*jslint browser: true */
var appData = {};
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
appData.work = [{}];
appData.idx = appData.work.length - 1;//Last, just added array entry
appData.work[appData.idx].employer = 'Shaw Cablesystems';
appData.work[appData.idx].position = 'Senior Software Developer';
appData.work[appData.idx].location = 'Calgary';
appData.wrk = appData.work[appData.idx];
appData.wrk.years_worked = 6;

appData.education = [];
appData.education.push({});
appData.idx = appData.work.length - 1;//Last, just added array entry
//JSLint will complain about bracket notation, but the lesson asks for it
appData.education[appData.idx]['institute'] = 'U of C';
appData.wrk = appData.education[appData.idx];//Get a reference to the single object
// TODO: alternative to 'class', which is a js keyword
appData.wrk['class'] = 'Adobe Flash CS5';

appData.addSkill = function (singleSkill) {
    "use strict";
    /*global HTMLskills */
    $('#skills').append(HTMLskills.replace(appData.placeholderText,
        singleSkill
        ));

};
appData.populatePage = function () {
    "use strict";
    /*global $, HTMLheaderName, HTMLheaderRole, HTMLemail, HTMLmobile,
        HTMLcontactGeneric, HTMLWelcomeMsg, HTMLskillsStart, HTMLbioPic,
        HTMLworkStart, HTMLworkEmployer, HTMLworkTitle, HTMLschoolStart,
        HTMLschoolName */
    var bio = appData.bio;

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
    bio.skills.forEach(appData.addSkill);

    $('#workExperience').append(HTMLworkStart);
    //appData.addWork($('#workExperience').last(), appData.work[0]);
//JSLint will complain about bracket notation, but the lesson asks for it
    $('#workExperience').last().append(HTMLworkEmployer.replace(appData.placeholderText,
        appData.work[0]['employer']
        ));
    $('#workExperience').last().append(HTMLworkTitle.replace(appData.placeholderText,
        appData.work[0]['position']
        ));

    $('#education').append(HTMLschoolStart);
    //appData.addEducation($('#education').last(), appData.education[0]);
    $('#education').last().append(HTMLschoolName.replace(appData.placeholderText,
        appData.education[0].institute
        ));

};

appData.populatePage();

//appData.resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(placeholderText, me.name);
