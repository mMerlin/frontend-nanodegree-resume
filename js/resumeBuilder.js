/*jslint browser: true, devel: true, indent: 4, maxlen: 82 */
/*global $ */
var appData;
if (appData === undefined) {
    appData = {};
}

//template information, for extension to the base project
appData.TEMPLATES = {
    'BLK_CONTROLS' : '<section class="controls sleep"></section>',
    'CTL_MENU_ITEM' : '<div class="ctlMenuItem %data%"></div>',
    'CTL_NEST_ITEM' : '<span class="iconNested"></span>'
};// ./appData.TEMPLATES
appData.CONST = {};
appData.CONST.DATA_PLACEHOLDER = '%data%'; //common replacement string
appData.CONST.ROW_HIDE = 'rowHide'; //css class; hide rows when paging
appData.CONST.WAKE_CONTROL = 'awake'; //css class; show controls as awake (hover)
appData.CONST.SLEEP_CONTROL = 'sleep'; //css class; hide unavailable controls
appData.CONST.COLLAPSED = 'closed';//control block state collapsed/closed state
appData.CONST.PAGING = 'paging';//control block has [some] page management active
appData.CONST.CONTROL_TAG = 'ctlMenuItem';//tag to identify control elements
appData.CONST.CONTROL_SELECTOR = '.' + appData.CONST.CONTROL_TAG;
appData.CONST.MENU_TAG = 'menuOpenClose';
appData.CONST.MENU_SELECTOR = '.' + appData.CONST.MENU_TAG;
appData.CONST.CONTROL_FUNCTIONS = [//based on css class tags
    'menuOpenClose',
    'pagePrevious',
    'pageNext',
    'pageAllRows',
    'pageReset'
];
appData.CONST.NESTED_CONTROLS = [//icons needing nested element for css graphics
    'pageAllRows'
];
/*
    'pageFirst',
    'pageLast',
    'pageIncrease',//more rows in page
    'pageDecrease',//less rows in page
    'pageAll',//all rows as single page
    'pageLess',//fewer details
    'pageMore',//More details
*/
appData.CONST.START_STATE = 'working';//Page state analysis started
appData.CONST.FINAL_STATE = 'complete';//Page state analysis started
appData.CONST.ERROR_STATE = 'error';//Page state analysis started


/**
 * Wrapper to load the main résumé objects
 * @return {undefined}
 */
appData.initialize = function (root) {
    'use strict';
    //Tell jslint to allow long lines in the JSON data structures
    /*jslint maxlen: 150 */

    /*
        The Front-End Developer nanodegree course style guide
        http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html
        says to use single quotes for JavaScript strings, but double quotes are
        required for json.  Which the course is also using for definition of this
        object.

        The styleguide says to use string concatenation to break long lines, but
        that is not valid when complying with JSON syntax.
     */

    /**
     * Create and populate the object containing general biographical information
     * for the résumé
     *
     * @type {Object}
     */
    root.bio = {
        "name" :                "H. Phil Duby",
        "role" :                "Web Developer",
        "contacts" : {
            "voice" : {
                "mobile" :      "403-993-2607",
                "land" :        "403-456-6104",
                "work" :        "undefined"
            },
            "mobile" :          "403-993-2607",
            "skype" :           "h.phil.duby",
            "email" :           "philduby@phriendly.net",
            "github" :          "mMerlin",
            "twitter" :         "H. Phil Duby",
            "location" :        "Calgary, AB, Canada",
            "postal" : {
                "Country" :     "Canada",
                "city" :        "Calgary",
                "stateProv" :   "AB",
                "zipPostal" :   "T3B 4N3",
                "street1" :     "27 Silversprings Drive NW",
                "street2" :     "Unit 66"
            }
        },
        "welcomeMessage" :      "Thank-you for visiting my web page.",
        "skills" : [
            "programming",
            "analysis",
            "desktop support"
        ],
        "biopic" :              "images/biopic.jpg"
    };// ./root.bio
    /* extended data blocks bio.contacts.voice, bio.contacts.postal */
    // "skills" : html, css, javascript, jQuery, bootstrap, JSON
    // framework, library, language, data formats


    /**
     * Crease and populate the object containing work history
     *
     * @type {Object}
     */
    root.work = {
        "jobs" : [
            {
                "employer" :    "GDM",
                "title" :       "Contract Programmer Analyst",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "2011 - 2012",
                "description" :
                    "Repair and rebuild of contract management web application"
            },
            {
                "employer" :    "The Lambda Geek",
                "title" :       "Owner / Operator",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "2009",
                "description" :
                    "Computer sales with hardware and desktop support"
            },
            {
                "employer" :    "Shaw Cablesystems",
                "title" :       "Senior Software Developer",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "2002 - 2008",
                "description" :
                    "Web site application support, Data conversion and green screen application support"
            },
            {
                "employer" :    "Donortrust",
                "title" :       "Volunteer Programmer",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "2006 - 2007",
                "description" :
                    "Work with the group doing design and development of the Donortrust applications to support the Christmas Future web site"
            },
            {
                "employer" :    "Nortel Networks",
                "title" :       "Contract Programmer Analyst",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1997 - 2001",
                "description" :
                    "Business application Y2K conversion and support"
            },
            {
                "employer" :    "TransAlta Utilities",
                "title" :       "Contract Programmer Analyst",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1994 - 1997",
                "description" :
                    "Application support for multiple areas"
            },
            {
                "employer" :    "Rhyason Consultants",
                "title" :       "Contract Programmer",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1993 - 1994",
                "description" :
                    "Oilwell Log Chart analysis Application conversion"
            },
            {
                "employer" :    "Hydro Mississauga",
                "title" :       "Contract Programmer Analyst",
                "location" :    "Mississauga, ON, Canada",
                "dates" :       "1992 - 1993",
                "description" :
                    "GIS application development"
            },
            {
                "employer" :    "MONENCO Information Systems Inc",
                "title" :       "System Analyst",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1983 - 1992",
                "description" :
                    "CADD system application development and support"
            },
            {
                "employer" :    "Western Canada Summer Games 1983",
                "title" :       "Contract Programmer",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1983 - 1983",
                "description" :
                    "Results network reporting development and support"
            },
            {
                "employer" :    "Western Cooperative Fertilizers, Ltd",
                "title" :       "Computer Programmer",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1980 - 1983",
                "description" :
                    "Business application conversion and development"
            },
            {
                "employer" :    "CIBC",
                "title" :       "MICR Sorter Operator",
                "location" :    "Calgary, AB, Canada",
                "dates" :       "1975 - 1980",
                "description" :
                    "Operation of cheque sorter equipment at bank data centre"
            }
        ],
        "config" : {
            "rowSelector" : '.work-entry',
            "overflow" : 6,
            "pageLimit" : 5,
            "controlSet" : [
                "pageReset",
                "pageAllRows",
                "pagePrevious",
                "pageNext"
            ]
        }
    };// ./root.work
    //resume controls.mm


    /**
     * Crease and populate the object containing featured project information
     *
     * @type {Object}
     */
    root.projects = {
        "projects" : [
            {
                "title" :       "Page Mockup",
                "dates" :       "2014",
                "description" :
                    "create web page using bootstrap framework to match provided mockup image",
                "images" : []
            },
            {
                "title" :       "Interactive Résumé",
                "dates" :       "2015",
                "description" :
                    "Build dynamic online résumé.&nbsp; You’re looking at a descendent of it!",
                "images" : []
            }
        ]
    };// ./root.projects


    /**
     * Create and populate the object containing education information
     *
     * @type {Object}
     */
    root.education = {
        "schools" : [
            {
                "name" :        "Southern Alberta Institute of Technology",
                "location" :    "Calgary, AB, Canada",
                "degree"  :     "none",
                "majors" : [
                    "selected CS courses",
                    "Technical Programming Certificate"
                ],
                "dates" :       "1980,1983",
                "url" :         "http://www.sait.ca/"
            },
            {
                "name" :        "University of Calgary",
                "location" :    "Calgary, AB, Canada",
                "degree"  :     "none",
                "majors" :      ["selected CS courses"],
                "dates" :       1982,
                "url" :         "http://ucalgary.ca/"
            }
        ],
        "onlineCourses" : [
            {
                "school" :      "Udacity",
                "title" :       "Front-End Web Developer NanoDegree",
                "dates" :       2015,
                "url" :         "https://www.udacity.com/course/nd001"
            },
            {
                "school" :      "Udacity",
                "title" :       "Artificial Intelligence for Robotics",
                "dates" :       2012,
                "url" :         "https://www.udacity.com/course/cs373"
            },
            {
                "title" :       "Introduction to Computer Science",
                "school" :      "Udacity",
                "dates" :       2012,
                "url" :         "https://www.udacity.com/course/cs101"
            }
        ]
    };// ./root.education


    /////////////////////////////////////////////////////////////
    // Encapsulate the data display functions into the objects //
    /////////////////////////////////////////////////////////////


    /**
     * Add the basic biographical information to the page
     * @param  {object} bio Biographical data object
     * @return {undefined}
     */
    root.bio.display = function (bio) {
        /*global HTMLheaderRole, HTMLheaderName, HTMLmobile, HTMLemail,
            HTMLgithub, HTMLtwitter, HTMLblog, HTMLlocation, HTMLbioPic,
            HTMLWelcomeMsg, HTMLskillsStart */
        var formattedHtml, PLC_HLD;//[also] used in inner closure scope
        PLC_HLD = appData.CONST.DATA_PLACEHOLDER;
        if (!$.isPlainObject(bio)) {
            //Major problem. This is not going to work, no practical runtime recovery
            return false;
        }

        formattedHtml = HTMLheaderRole.replace(PLC_HLD,
            bio.role || 'no role specified'
            );
        $('#header').prepend(formattedHtml);
        formattedHtml = HTMLheaderName.replace(PLC_HLD,
            bio.name || 'the unknown comic'
            );
        $('#header').prepend(formattedHtml);

        //Individual contact details are optional: only insert when they exist
        function showContact(template, dataSource) {
            if (bio.contacts[dataSource]) {
                formattedHtml = template.replace(PLC_HLD,
                    bio.contacts[dataSource]
                    );
                $('#topContacts').append(formattedHtml);
            }
        }// ./showContact(template, dataSource)

        //Show contacts that do not have a preformatted template
        function showGenericContact(contactType, dataSource) {
            /*global HTMLcontactGeneric */
            var partialTemplate;
            partialTemplate = HTMLcontactGeneric.replace('%contact%', contactType);
            showContact(partialTemplate, dataSource);
        }// ./showGenericContact(contactType, dataSource)

        showContact(HTMLmobile, 'mobile');
        showContact(HTMLemail, 'email');
        showGenericContact('skype', 'skype');
        showContact(HTMLgithub, 'github');
        showContact(HTMLtwitter, 'twitter');
        showContact(HTMLblog, 'blog');
        showContact(HTMLlocation, 'location');

        formattedHtml = HTMLbioPic.replace(PLC_HLD,
            bio.biopic || 'http://placehold.it/100x100'
            );
        $('#header').append(formattedHtml);
        formattedHtml = HTMLWelcomeMsg.replace(PLC_HLD,
            bio.welcomeMessage || 'welcome not specified'
            );
        $('#header').append(formattedHtml);

        /**
         * Add a single skill entry to the page
         * @param  {string} singleSkill The name/description for a single skill
         * @return {undefined}
         */
        function showSkill(singleSkill) {
            /*global HTMLskills */
            formattedHtml = HTMLskills.replace(PLC_HLD,
                singleSkill
                );
            $('#skills').append(formattedHtml);
        }// ./showSkill(singleSkill)

        // Add the skills summary to the header: only when skills exist
        if ($.isArray(bio.skills) && bio.skills.length > 0) {
            $('#header').append(HTMLskillsStart);
            bio.skills.forEach(showSkill);//append all skills listed
        }
    };// ./root.bio.display(bio)


    /**
     * Add the employment history details to the page.
     *
     * @param  {object} work work experience information
     * @return {undefined}
     */
    root.work.display = function (work) {
        /*global HTMLworkStart, HTMLworkEmployer, HTMLworkTitle, HTMLworkLocation,
            HTMLworkDates, HTMLworkDescription */
        var jobNum, jobEle, fmtEmployer, formattedHtml, PLC_HLD;
        PLC_HLD = appData.CONST.DATA_PLACEHOLDER;

        if (!($.isPlainObject(work) && $.isArray(work.jobs))) {
            //Major problem. This is not going to work, no practical runtime recovery
            return false;
        }

        for (jobNum = 0; jobNum < work.jobs.length; jobNum += 1) {

            // Create (div) wrapper to hold details for single job
            $('#workExperience').append(HTMLworkStart);

            fmtEmployer = HTMLworkEmployer.replace(PLC_HLD,
                work.jobs[jobNum].employer || 'no employer'
                );
            formattedHtml = HTMLworkTitle.replace(PLC_HLD,
                work.jobs[jobNum].title || 'no title'
                );
            jobEle = $('.work-entry:last');//Only get wrapper element once
            jobEle.append(fmtEmployer + formattedHtml);

            formattedHtml = HTMLworkLocation.replace(PLC_HLD,
                work.jobs[jobNum].location || 'no location'
                );
            jobEle.append(formattedHtml);

            formattedHtml = HTMLworkDates.replace(PLC_HLD,
                work.jobs[jobNum].dates || 'no dates'
                );
            jobEle.append(formattedHtml);

            formattedHtml = HTMLworkDescription.replace(PLC_HLD,
                work.jobs[jobNum].description || 'no description'
                );
            jobEle.append(formattedHtml);
        }// ./for

        if ($.isPlainObject(work.config)) {
            // The JSON data includes some exta display configration information.
            // Provide some extra supporting user controls
            work.config.build = appData.controls.buildPageable;
            appData.controls.addBlockControls('#workExperience', work.config);
        }
    };// ./root.work.display(work)


    /**
     * Add the project information to the web page
     *
     * @param  {object} work work experience information
     * @return {undefined}
     */
    root.projects.display = function (projects) {
        var PLC_HLD;
        PLC_HLD = appData.CONST.DATA_PLACEHOLDER;//for nested functions

        if (!($.isPlainObject(projects) && $.isArray(projects.projects))) {
            //Major problem. This is not going to work, no practical runtime recovery
            return false;
        }

        /**
         * Add all details for a single project to the résumé web page
         * @param {object} projectObject Object with properties holding project
         *                               details
         * @return {undefined}
         */
        function addOneProject(projectObject) {
            /*global HTMLprojectStart, HTMLprojectTitle, HTMLprojectDates,
                HTMLprojectDescription, HTMLprojectImage */
            var prjEle, img, formattedHtml;
            $('#projects').append(HTMLprojectStart);
            prjEle = $('.project-entry:last');//The just added project wrapper element

            formattedHtml = HTMLprojectTitle.replace(PLC_HLD,
                projectObject.title || 'no project title'
                );
            prjEle.append(formattedHtml);

            formattedHtml = HTMLprojectDates.replace(PLC_HLD,
                projectObject.dates || 'no project dates'
                );
            prjEle.append(formattedHtml);

            formattedHtml = HTMLprojectDescription.replace(PLC_HLD,
                projectObject.description || 'no project description'
                );
            prjEle.append(formattedHtml);

            for (img = 0; img < projectObject.images.length; img += 1) {
                formattedHtml = HTMLprojectImage.replace(PLC_HLD,
                    projectObject.images[img]
                    );
                prjEle.append(formattedHtml);
                // TODO: Add generic alt attribute for each image based on proj title
                // and img (sequence number)
            }
        }// ./addOneProject(projectObject)

        projects.projects.forEach(addOneProject);
    };// ./root.projects.display(projects)


    /**
     * Add the education information to the web page
     *
     * @param  {object} education shools and other education sources
     * @return {undefined}
     */
    root.education.display = function (education) {
        var formattedHtml, PLC_HLD;//(also) for nested functions
        PLC_HLD = appData.CONST.DATA_PLACEHOLDER;//for nested functions

        if (!($.isPlainObject(education) && $.isArray(education.schools))) {
            //Major problem. This is not going to work, no practical runtime recovery
            return false;
        }

        /**
         * Add all details for a single school to the page
         * @param {object} schoolObject Object with properties holding school details
         * @return {undefined}
         */
        function addOneSchool(schoolObject) {
            /*global HTMLschoolStart, HTMLschoolName, HTMLschoolLocation,
                HTMLschoolDates, HTMLschoolDegree, HTMLschoolMajor */
            var eduEle, mjr;
            $('#education').append(HTMLschoolStart);
            eduEle = $('.education-entry').last();//The just added wrapper element

            formattedHtml = HTMLschoolName.replace(PLC_HLD,
                schoolObject.name || 'no school name'
                );
            eduEle.append(formattedHtml);

            formattedHtml = HTMLschoolLocation.replace(PLC_HLD,
                schoolObject.location || 'no school location'
                );
            eduEle.append(formattedHtml);

            formattedHtml = HTMLschoolDates.replace(PLC_HLD,
                schoolObject.dates || 'no dates'
                );
            eduEle.append(formattedHtml);

            formattedHtml = HTMLschoolDegree.replace(PLC_HLD,
                schoolObject.degree || 'no degree specified'
                );
            eduEle.append(formattedHtml);

            if ($.isArray(schoolObject.majors)) {
                for (mjr = 0; mjr < schoolObject.majors.length; mjr += 1) {
                    formattedHtml = HTMLschoolMajor.replace(PLC_HLD,
                        schoolObject.majors[mjr]
                        );
                    eduEle.append(formattedHtml);
                }// ./for
            }// ./($.isArray(schoolObject.majors))
        }// ./addOneSchool(schoolObject)

        education.schools.forEach(addOneSchool);
    };// ./root.education.display(education)
};// ./appData.initialize(root)

/**
 * Return the internationaized version of a full name
 *
 * Direct function, instead of variable as function, because it is referenced
 * from pre-written helper code.
 *
 * @param  {string} localNames Full name, with surname last.  Names separated
 *                             by spaces.  Handles multiple (middle) names
 *                             and/or initials, as long as each initial is
 *                             separated from surrounding names and initials by
 *                             spaces.
 * @return {string}            Internationlized full name; surname uppercase,
 *                             with the rest leading caps only.
 *
 * Currently needs to be a global level function, to work with the provided
 * helper.js code
 */
function inName(localNames) {
    'use strict';
    var inNames, nm, nameParts, finalName;

    // Start by changing to all lowercase, then only uppercase where needed
    nameParts = localNames.trim().toLocaleLowerCase().split(" ");
    finalName = nameParts.length - 1;//index to last part of name === surname
    for (nm = 0; nm < finalName; nm += 1) {//First, middle, and initials
        if (nameParts[nm].length > 0) {
            // Safety check: handle multiple spaces between names
            // Set leading character to uppercase
            nameParts[nm] = nameParts[nm][0].toLocaleUpperCase() +
                nameParts[nm].slice(1);
        }
    }
    // Make the last name all uppercase
    nameParts[finalName] = nameParts[finalName].toLocaleUpperCase();

    inNames = nameParts.join(" ");
    return inNames;
}// ./inName(localNames)

/**
 * Build the map to show on the page
 * @return {undefined}
 */
appData.showMap = function () {
    'use strict';
    /*global googleMap */
    $('#mapDiv').append(googleMap);
};

appData.app = {};
/**
 * Encapsulate the creation of (function) resources for the application
 * @param  {Object} root The base object for the application
 * @return {undefined}
 */
appData.app.build = function (root) {
    'use strict';
    var ctl, PLC_HLD, isNonEmptyObject, locateEventControl, getControlFunction,
        toggleControls, processPagePrevious, processPageNext, processPageAllRows,
        processPageReset, buildPageState;
    PLC_HLD = appData.CONST.DATA_PLACEHOLDER;

    // Common functions to support controls
    root.controls = {};
    ctl = root.controls;

    // Create a place to store the global configuration information.  This is
    // (to be) managed by the page level configuration tool, and accessed by
    // (at least) the control block reset functions.
    ctl.configuration = {};


    //////////////////////////////////////////////////////////////////////////
    // Local helper and utility functions: Accessed via local/closure scope //
    //////////////////////////////////////////////////////////////////////////

    /**
     * Detect non empty plain objects.
     * @param  {object}  obj object to be tested
     * @return {Boolean}     true when obj is a plain (non Array) object with at
     *                       least one of its own properties
     *
     * Similar to jQuery.isEmptyObject(). but excludes prototype inherited
     * properties, by checking getOwnPropertyNames | hasOwnProperty
     *
     * Ref: http://blog.niftysnippets.org/2010/09/say-what.html
     */
    isNonEmptyObject = function (obj) {
        var key;
        if ($.isPlainObject(obj)) {
            if (Object.getOwnPropertyNames) {
                return Object.getOwnPropertyNames(obj).length > 0;
            }
            for (key in obj) {
                if (obj.hasOwnProperty(key)) { return true; }
            }
        }
        return false;//Not a plain object, or is empty
    };// ./isNonEmptyObject(obj)

    /**
     * Trace event path information to locate the (nearest parent) control
     *
     * @param  {eventObject} evObj jQuery event object for control delegate
     * @return {jQueryElement}     The matched control element (or null)
     */
    locateEventControl = function (evObj) {
        /**
         * Recursive closure function to locate the actual control element in
         * the delegate event path (chain)
         *
         * @param  {DOMelement} ele DOM element to start/continue search from
         * @return {jQueryElement}  The matched control element (or null)
         */
        function walkUpFrom(ele) {
            var jqEle;
            jqEle = $(ele);
            if (jqEle.hasClass(appData.CONST.CONTROL_TAG)) {
                return jqEle;
            }
            if (ele === evObj.currentTarget) {//closure reference
                return null;//could throw typeError instead
            }
            return walkUpFrom(ele.parentElement);
        }// ./walkUpFrom(ele)

        return walkUpFrom(evObj.target);
    };// ./locateEventControl(evObj)

    /**
     * Determine the function that using the control triggers
     * @param  {string} ctlClass class name string for a control element
     * @return {integer}         function identifier for the associated control
     */
    getControlFunction = function (ctlClass) {//ctlEle if class not enough
        // LOGIC QUERY:
        //check if each known function tag exists in the class list?
        //check if each class in the list is in the known function tags?
        var classes, cls, ctlFunction;
        if (typeof ctlClass !== 'string') {
            throw new TypeError(
                'getControlFunction was not passed a string argument'
            );
        }
        classes = ctlClass.split(' ');//array of individual class names
        if (classes.length === 0) {
            throw new RangeError('no function tags exist for control element');
        }
        //Process active classes in descending order: match likely at the end
        for (cls = classes.length - 1; cls >= 0; cls -= 1) {
            ctlFunction = appData.CONST.CONTROL_FUNCTIONS.indexOf(classes[cls]);
            if (ctlFunction >= 0) {
                return ctlFunction;//Found a tag matching the class name
            }
        }// ./for
        throw new RangeError(
            'control element does not have a recognized function tag'
        );
    };// ./getControlFunction(ctlClass)

    /**
     * Show initial, or hide all control functions for the block
     * @param  {jQueryElement} ctlEle root element of control block
     * @return {undefined}
     */
    toggleControls = function (ctlEle) {
        var pgState, pageGroup;
        // LOGIC QUERY: should buildPageState() be:
        //   buildControlState? buildControlSetState?
        pgState = buildPageState(ctlEle);
        if (pgState.state !== appData.CONST.FINAL_STATE) {
            // non paging would be valid here too, but no case for now
            throw new ReferenceError(
                'toggle controls references invalid page data'
            );
        }

        //Use the current state to decide whether need to show or hide controls
        pgState.base.state = pgState.base.state ||
            appData.CONST.COLLAPSED;//Initialize when state does not yet exist
        if (pgState.base.state === appData.CONST.COLLAPSED) {
            console.log('open controls');
            // Only the root of the control set is currently being shown: Open
            // up the next level

            //Use the embeded configuration information to figure out what to do
            if (typeof pgState.rowSelector === 'string') {
                console.log(pgState.rowSelector);
                //Looks like paging controls may be needed.
                // Get or set default for full page length (no next page), and
                // row limit when there are more pages available.
                if (pgState.rowCount > pgState.overflow) {
                    // wake up the known paging controls
                    console.log('wake paging');
                    //Considered using an array in CONST to hold the list of
                    // paging controls to wakeup here, but decided that further
                    // logic is going to manage which controls to display based
                    // on the actual data.  Use a local array instead that can
                    // be populated programmatically (just) before getting here.
                    // LOGIC QUERY: ? replace class selectors with CONST
                    //   references?
                    pageGroup = ['.pagePrevious', '.pageNext', '.pageAllRows',
                        '.pageReset'];
                    pageGroup.forEach(function (mask) {
                        ctlEle.children(mask).
                            removeClass(appData.CONST.SLEEP_CONTROL);
                    });
                    pgState.base.state = appData.CONST.PAGING;
                } // else { !(pgState.rowCount > pgState.overflow)
                    // Too few rows to ever need any paging controls (with
                    // configured page size and overflow limits)
                //}
                // TODO: controls to show more or less details, hide all show all
                // another section of the configiration object?
            }// ./if (typeof pgState.base.rowSelector === 'string')
        } else { // !(pgState.base.state === 'closed')
            console.log('close controls');
            // The menu icon was clicked with other controls open; close all of
            // the child controls in the set, except for the menu control itself.
            ctlEle.children(appData.CONST.CONTROL_SELECTOR).
                not(appData.CONST.MENU_SELECTOR).
                addClass(appData.CONST.SLEEP_CONTROL);
            pgState.base.state = appData.CONST.COLLAPSED;
        }// ./else !(pgState.base.state === 'closed')
    };// ./toggleControls(ctlEle)

    /**
     * Collect state information for the [pseudo] page associated with the
     * control block
     *
     * @param  {Element} ctlEle   wrapper jQuery element for the control block
     * @return {object}           State information for the current page
     */
    buildPageState = function (ctlEle) {
        var pageState, blkConfig, hiddenRows, row, visibleRows;
        pageState = {};
        pageState.state = appData.CONST.START_STATE;

        blkConfig = ctlEle.data().config;
        if (!isNonEmptyObject(blkConfig)) {
            throw new TypeError(
                'No configuration data supplied for control element block'
            );
        }

        pageState.base = blkConfig;
        pageState.rowSelector = blkConfig.rowSelector;
        if (typeof pageState.rowSelector !== 'string') {
            //pageState.state = appData.CONST.FINAL_STATE;
            //pageState.state = 'notpaging';
            return pageState;
        }
        pageState.allRows = ctlEle.parent().children(pageState.rowSelector);
        pageState.rowCount = pageState.allRows.length;
        pageState.lastRow = pageState.rowCount - 1;
        pageState.overflow = blkConfig.overflow || pageState.totalRows;
        pageState.pageLimit = blkConfig.pageLimit || pageState.overflow;
        //locate current page: first and last rows without ROW_HIDE class
        hiddenRows = pageState.allRows.filter('.' + appData.CONST.ROW_HIDE);
        visibleRows = pageState.rowCount - hiddenRows.length;
        if (visibleRows === pageState.rowCount) {
            // All rows are hidden
            // LOGIC QUERY: what if rowCount === 0 ?
            pageState.pageTop = -1;
            pageState.pageEnd = -1;
        } else if (visibleRows === 0) {
            // All rows are visible
            pageState.pageTop = 0;
            pageState.pageEnd = pageState.rowCount - 1;
        } else {
            // Some but not all rows are hidden: find the non-hidden block
            for (row = 0; row < pageState.rowCount; row += 1) {
                // Locate the first non-hidden row
                if (!$(pageState.allRows[row]).hasClass(appData.CONST.ROW_HIDE)) {
                    pageState.pageTop = row;
                    row = pageState.rowCount;
                }
            }
            // Verify that enough following rows are also not hidden to account
            // for the difference in hidden and total row counts.
            for (row = pageState.pageTop + 1;
                    row < pageState.pageTop + visibleRows; row += 1
                    ) {
                if ($(pageState.allRows[row]).hasClass(appData.CONST.ROW_HIDE)) {
                    // Data error: visible rows are not contiqious block
                    throw new RangeError('split page detected');
                }
            }
            pageState.pageEnd = pageState.pageTop + visibleRows - 1;
        }
        pageState.state = appData.CONST.FINAL_STATE;

        return pageState;
    };// ./buildPageState(ctlEle)

    /**
     * Back up the display for the controlled section by one page
     *
     * Hide the currently displayed rows, and show the previous rows based on
     * the configured page size.
     *
     * @param  {jQueryElement} ctlEle    Root control for the current block
     * @return {undefined}
     */
    processPagePrevious = function (ctlEle) {
        var pgState, showStart, showEnd, hideStart, hideEnd;

        pgState = buildPageState(ctlEle);
        if (pgState.state !== appData.CONST.FINAL_STATE) {
            throw new ReferenceError('page up references invalid page data');
        }

        //Get values for slice ranges: end is one higher than actually used
        //This logic handles the case where pgState.overflow rows are currently
        // shown at the start of the data, but reducing that to pgState.pageLimit
        // rows.
        showStart = pgState.pageTop - pgState.pageLimit;// One page backward
        if (pgState.pageTop < pgState.overflow) {
            //Include orphan rows just before the start of the new page
            showStart = 0;
        }
        if (showStart < 0) {
            //In case paging operations code got out of sync with page size
            showStart = 0;
        }
        showEnd = showStart + pgState.pageLimit;//rows for one normal page
        if (showEnd < pgState.pageTop) {
            //In case start ajusted to prevent orphan, make sure not to skip
            //rows just before the start of the current page
            showEnd = pgState.PageTop;
        }
        if (pgState.rowCount <= pgState.overflow) {
            //When only one page of data, including the overflow
            showEnd = pgState.rowCount;
        }
        if (showEnd > pgState.rowCount) {
            //Make sure not to go past the end of the available data
            showEnd = pgState.rowCount;
        }
        hideStart = pgState.pageTop;//The limits for the current page
        hideEnd = pgState.pageEnd + 1;
        if (hideStart < showEnd) {
            //Do not hide rows that are just going to be shown again
            hideStart = showEnd;
        }

        // Hide the rows for the current page, and show them for the previous one.
        if (hideEnd > hideStart) {
            pgState.allRows.slice(hideStart, hideEnd).
                addClass(appData.CONST.ROW_HIDE);
        }
        pgState.allRows.slice(showStart, showEnd).
            removeClass(appData.CONST.ROW_HIDE);
    };// ./processPagePrevious(ctlEle)

    /**
     * Advance the display for the controlled section by one page
     *
     * Hide the currently displayed rows, and show the following rows based on
     * the configured page size.
     * LOGIC QUERY:
     * If not enough remaining rows to fill a page:
     * - display a partial page
     * - add enough rows from previous data to fill the page
     * - configuration setting?
     *
     * @param  {jQueryElement} ctlEle  Wrapper element for the control set
     * @return {undefined}
     */
    processPageNext = function (ctlEle) {
        var pgState, hideEnd, showEnd;

        pgState = buildPageState(ctlEle);
        if (pgState.state !== appData.CONST.FINAL_STATE) {
            throw new ReferenceError('page down references invalid page data');
        }

        // Safety net: should never hit this, if control is properly disabled
        if (pgState.pageEnd >= pgState.lastRow) {
            //Already at the end of the page nothing to do
            return;
        }

        //Get values for slice ranges: end is one higher than actually used
        //hideStart = pgState.pageTop;
        hideEnd = pgState.pageEnd + 1;//showStart = hideEnd;
        showEnd = hideEnd + pgState.pageLimit;
        if (hideEnd + pgState.overflow >= pgState.rowCount) {
            //Prevent orphans at the end of the data
            showEnd = pgState.rowCount;
        }
        if (showEnd > pgState.rowCount) {
            showEnd = pgState.rowCount;
        }
        // LOGIC QUERY:
        //If want to show a full page at the end of the document, set hideEnd
        //to showEnd - pgState.rowCount (if that is less)

        // Hide the rows for the current page, and show them for the next one.
        pgState.allRows.slice(pgState.pageTop, hideEnd).
            addClass(appData.CONST.ROW_HIDE);
        pgState.allRows.slice(hideEnd, showEnd).
            removeClass(appData.CONST.ROW_HIDE);
    };// ./processPageNext(ctlEle)

    processPageAllRows = function (ctlEle) {
        var pgState;

        pgState = buildPageState(ctlEle);
        if (pgState.state !== appData.CONST.FINAL_STATE) {
            throw new ReferenceError(
                'show all page rows references invalid page data'
            );
        }

        pgState.overflow = pgState.rowCount;
        pgState.pageLimit = pgState.rowCount;
        pgState.allRows.removeClass(appData.CONST.ROW_HIDE);
        // TODO: should hide controls for paging (not the reset or other config)
    };// ./processPageAllRows(ctlEle)

    /**
     * Set the page configuration back to the defaults
     * @param  {jQueryElement} ctlEle  Wrapper element for the control set
     * @return {undefined}
     */
    processPageReset = function (ctlEle) {
        var pgState;

        pgState = buildPageState(ctlEle);
        if (pgState.state !== appData.CONST.FINAL_STATE) {
            throw new ReferenceError('page reset references invalid page data');
        }

        pgState.overflow = pgState.base.overflow;
        pgState.pageLimit = pgState.base.pageLimit;

        //processGoFirstPage(ctlEle);
        // TODO: implment processGoFirstPage(ctlEle)
        // - logic for splice selection similar? to processPreviousPage()
    };// ./processPageReset(ctlEle)

    /////////////////////////////////////////////////////////////////////
    // Exported functions accessable outside the current closure scope //
    /////////////////////////////////////////////////////////////////////

    /**
     * Add control to change page to internationalized content
     * @return {undefined}
     */
    ctl.showInternationalize = function () {
        /*global internationalizeButton */
        $('#main').append(internationalizeButton);
    };// ./showInternationalize = function ()

    /**
     * configure a pageable section block of controls to their starting state
     *
     * LOGIC QUERY:
     * Might move to helper functions set, when change reference to use event
     * trigger instead of direct call
     *
     * @param  {jQuery Selector} controlRoot wrapper for the block of controls
     * @return {undefined}
     */
    ctl.resetBlock = function (controlRoot) {
        var controlEle, blockConfig, pageConfig;
        controlEle = $(controlRoot);// control block wrapper
        // get block configuration settings, or default to an empty objectd
        blockConfig = controlEle.data().config || {};
        if (typeof blockConfig.rowSelector === 'string') {
            // A (potentially) pageable block
            pageConfig = buildPageState(controlEle);

            // Get or set default for full page length (no next page), and row
            // limit when there are more pages.
            if (pageConfig.rowCount > pageConfig.overflow) {
                //Setup to show only the first page worth of rows
                pageConfig.allRows.slice(0, pageConfig.pageLimit)
                    .removeClass(appData.CONST.ROW_HIDE);
                pageConfig.allRows.slice(pageConfig.pageLimit)
                    .addClass(appData.CONST.ROW_HIDE);
            } else {
                //Few enough rows to display them all to start
                pageConfig.allRows.removeClass(appData.CONST.ROW_HIDE);
            }
        }
        // reset the control states too
        // Hide everything except the activation symbol / marker / menu icon
        controlEle.children().addClass(appData.CONST.SLEEP_CONTROL);
        controlEle.children(appData.CONST.MENU_SELECTOR).
            removeClass(appData.CONST.SLEEP_CONTROL);
        // The wrapper is created 'sleeping' to avoid some flicker, so need to
        // wake it up (at least) the first time.
        controlEle.removeClass(appData.CONST.SLEEP_CONTROL);
    };// ./resetBlock(controlRoot)

    /**
     * Create a 'standard' block of user interaction controls, populated based
     * on the provided options
     * @param {selector} parentEle   jQuery Selector for root element of block
     *                               to add controls to
     * @param {object}   options     configuration information for the controls
     *                               of the block
     * @return {undefined}
     */
    ctl.addBlockControls = function (parentEle, options) {
        var controlEle;
        controlEle = $(appData.TEMPLATES.BLK_CONTROLS);//basic wrapper
        options.build(controlEle, options, parentEle);//add needed controls

        //Add the main open menu control last, to position the control set at
        // the right edge, and 'open' it to the left.
        //Do this here, instead of inside the referenced options.build()
        // function, so that multple generic 'builds' can be done, and still
        // always get the top control last and only once.
        controlEle.append(appData.TEMPLATES.CTL_MENU_ITEM.replace(
            PLC_HLD,
            appData.CONST.MENU_TAG
        ));

        // Insert the populated wrapper as the first child of the parent
        $(parentEle).prepend(controlEle);
    };// ./addBlockControls(parentEle, options)

    /**
     * Create a 'standard' set of controls to handle paging of block contents
     * @param  {[type]} controlBlockWrapper [description]
     * @param  {[type]} options             [description]
     * @return {undefined}
     *
     *  ../../Resume Controls.mm
     */
    ctl.buildPageable = function (controlBlockWrapper, options) {//, scopeEle
        var wrapperEle;

        wrapperEle = $(controlBlockWrapper);
        if (!$.isPlainObject(options)) {
            throw new TypeError(
                'No options supplied to build pageable control block'
            );
        }
        wrapperEle.data('config', options);

        ////////////////////////////////////////////////
        // Individual control elements from templates //
        ////////////////////////////////////////////////
        if ($.isArray(options.controlSet)) {
            // Some control functions were specified
            options.controlSet.forEach(function (ctlFunction) {
                var newCtl;
                // Basic control menu item, with specific function filled in
                newCtl = $(appData.TEMPLATES.CTL_MENU_ITEM.replace(
                    PLC_HLD,
                    ctlFunction
                ));
                if (appData.CONST.NESTED_CONTROLS.indexOf(ctlFunction) >= 0) {
                    // Child element (only) for controls that have more graphics
                    newCtl.append(appData.TEMPLATES.CTL_NEST_ITEM);
                }
                wrapperEle.append(newCtl);// Complete control icon
            });
        }

        //Include scopeEle if need access to the context for the block of
        //controls.
        //$(scopeEle).children().length
        //Not needed if details are not used to determine which controls are
        //added to the block.  They will stay hidden unless/until needed.

        //If fixed positioning:
        //  1) use css rules to position the [sub] controls
        //  2) use js to position at time of creation
        //      a) hard-coded logic
        //      b) configuration logic
        //      c) dynamic from page context
        //If responsive
        //  1) use css rules (and media queries)
        //  2) use js to [re]position on resize
        //      sub options as for fixed positioning
    };// ./buildPageable(controlBlockWrapper)

    /**
     * Handle all of the click events for all control function blocks
     * A single delate handler, instead of attaching a handler to each control
     *
     * @return {undefined}
     */
    ctl.baseClick = function (e) {
        var ctlEle, ctlTarget, ctlFunction;
        console.log('baseClick');

        // A bit of sanity check validation
        ctlEle = $(this);// The wrapper for the block of controls
        if (ctlEle.length !== 1) {
            throw new TypeError('"this" is not a valid element in baseClick');
        }

        // LOGIC QUERY:
        //Is class going to be enough to both find the top element for any
        //control in the block, and to uniquely identify which control it is
        //once found?
        //For css control graphics, the set of classes is going have to be
        //unique, as long as the visual image for each control is unique.
        //That does not mean that a single class is enough to be unique, so
        //be careful.  EG: "ctlMenuItem pagePrevious",
        //"textMenuItem pagePrevious"
        ctlTarget = locateEventControl(e);
        //ctlFunction = getControlFunction(ctlTarget); //only if need more
        ctlFunction = getControlFunction(ctlTarget.attr('class'));
        console.log(appData.CONST.CONTROL_FUNCTIONS[ctlFunction]);

        // LOGIC QUERY:
        // using (a bunch) of inner functions for closure would eliminate the
        // need to pass most (or all ) of the parameters to the 'processing'
        // functions.  Or duplicating functionality.  Handle duplication by
        // using a common function, and (if needed) returning an object
        // holding the needed properties
        // NOTE: the indenting may not match the style guide, but is needed to
        // keep jslint happy
        switch (ctlFunction) {//indicies to appData.CONST.CONTROL_FUNCTIONS
        case 0:
            toggleControls(ctlEle);
            break;
        case 1:
            processPagePrevious(ctlEle);
            break;
        case 2:
            processPageNext(ctlEle);
            break;
        case 3:
            processPageAllRows(ctlEle);
            break;
        case 4:
            processPageReset(ctlEle);
            break;
        default:
            throw new RangeError('identified function was not processed');
        }

    };// ./baseClick(e)
    /*
        MouseEvent
        click
        currentTarget:
            wrong target: currently the wrapper for the controls block
            this 'works' because all of the other controls are hidden
        delegateTarget: div#main
        handleObj
            namespace
            selector
            type
        originalEvent: browser native event object
            dataTransfer: for drag and drop?
        relatedTarget: null ?toElement|fromElement for mouseout|mouseover
        target: the child? for current target the first saw the event?
        timeStamp
        toElement: the element the mouse moved to (mouseout)
        view
        modifier keys
            altKey
            ctrlKey
            metaKey
            shiftKey
        mouse coordinates
            clientX: relative to browser left edge (os border?)
            clientY
            offsetX: within currentTarget
            offsetY
            pageX: relative to scrollable top of page
            pageY
            screenX: OS viewport?
            screenY
    */
};// ./appData.app.build(root)

/**
 * bind the handlers needed for interactive functionality
 * @param  {[type]} root [description]
 * @return {undefined}
 */
appData.app.initialize = function (root) {
    'use strict';
    var ctl = root.controls;

    //Setup event delegate handlers for the interactive controls
    $('#main').on('mouseenter', appData.CONST.CONTROL_SELECTOR, function () {
        $(this).addClass(appData.CONST.WAKE_CONTROL);
    });
    $('#main').on('mouseleave', appData.CONST.CONTROL_SELECTOR, function () {
        $(this).removeClass(appData.CONST.WAKE_CONTROL);
    });
    $('.controls').on('click.aro', ctl.baseClick);

    // TODO: trigger reset action/event instead of direct function call?
    $.each($('.controls'), function (idx, controlEle) {
        ctl.resetBlock(controlEle, idx);// idx ignored; jslint pacifier
    });
    ctl.showInternationalize();

    //show all of the hidden application sections as one batch
    $('#main > div').removeClass(appData.CONST.SLEEP_CONTROL);
};// ./app.initialize(root)

//Load the résumé data into application storage
appData.initialize(appData);
appData.app.build(appData);// Create common resources needed by display functions
appData.bio.display(appData.bio);
appData.work.display(appData.work);
appData.projects.display(appData.projects);
appData.education.display(appData.education);
appData.showMap();
appData.app.initialize(appData);//Setup the dynamic features

//appData.resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(DATA_PLACEHOLDER, me.name);

/*
    TODO:

    added functionality
        - by default truncate the long list of employment history
        - add "more" button (aro)
            - aro: hide, more, less, reset
        - same for skills
        - hover popups for detail expansion
        - replace (some) template strings with html5 template tag
            - add wrapper and/or class and css for IE support
 */
