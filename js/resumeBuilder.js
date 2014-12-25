/*jslint browser: true */
var appData = {};
appData.placeholderText = '%data%'; //common replacement string
appData.skills =  ['programming', 'analysis', 'desktop support'];
appData.bio = {
    'name' : 'H. Phil Duby',
    'role' : 'Web Developer',
    'pic_url' : 'http://phriendly.net/images/phil.jpg',
    'contact' : {
        'phone' : {
            'mobile' : '(403) 993-2607',
            'land' : '(403) 456-6104',
            'work' : undefined
        },
        'email' : 'philduby@phriendly.net',
        'github' : 'https://github.com/mMerlin',
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
    'skills' : appData.skills
};

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
        HTMLcontactGeneric, HTMLWelcomeMsg, HTMLskillsStart, HTMLbioPic */
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

    //$(HTMLskillsStart).insertBefore($('#workExperience'));
    bio.skills.forEach(appData.addSkill);
};

appData.populatePage();

//appData.resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(placeholderText, me.name);
