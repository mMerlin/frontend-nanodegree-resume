/*jslint browser: true, devel: true, indent: 4, maxlen: 82 */
/*global $ */
var appData;
if (appData === undefined) {
    appData = {};
}
appData.CONST = {};
appData.CONST.DATA_PLACEHOLDER = '%data%'; //common replacement string
appData.CONST.ROW_HIDE = 'rowHide'; //css class; hide rows when paging
appData.CONST.WAKE_CONTROL = 'awake'; //css class; show controls as awake (hover)
appData.CONST.SLEEP_CONTROL = 'sleep'; //css class; hide unavailable controls
appData.CONST.COLLAPSED = 'closed';//control block state collapsed/closed state
appData.CONST.PAGING = 'paging';//control block has [some] page management active
appData.CONST.CONTROL_TAG = 'aroCtl';//tag to identify control elements
appData.CONST.CONTROL_FUNCTIONS = [//based on css class tag
    'blockRoot',
    'pageUp',
    'pageDown'
];

/**
 * Wrapper to load the résumé data using JSON structures
 * @return {undefined}
 */
appData.initialize = function () {
    'use strict';
    /*
        The Front-End Developer nanodegree course style guide
        http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html
        says to use single quotes for JavaScript strings, but double quotes are
        required for json.  Which the course is also using for definition of this
        object.

        The styleguide says to use string concatenation to break long lines, but
        that is not valid when complying with JSON syntax.
     */
    //Tell jslint to allow long lines in the JSON data structures
    /*jslint maxlen: 150 */

    /**
     * Create and populate the object containing general biographical information
     * for the résumé
     *
     * @type {Object}
     */
    appData.bio = {
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
    };// ./appData.bio
    /* extended data blocks bio.contacts.voice, bio.contacts.postal */
    //"skills" : html, css, javascript, jQuery, bootstrap, JSON
    // framework, library, language, data formats


    /**
     * Crease and populate the object containing work history
     *
     * @type {Object}
     */
    appData.work = {
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
                "PAGE_UP",
                "PAGE_DOWN"
            ]
        }
    };// ./appData.work
    //.FULL_PAGE
    //.TOP_OF_PAGE
    //.END_OF_PAGE
    //.MORE_ROWS
    //.LESS_ROWS
    //.RESET_PAGE
    //.MORE_DETAILS
    //.LESS_DETAILS
    //resume controls.mm


    /**
     * Crease and populate the object containing featured project information
     *
     * @type {Object}
     */
    appData.projects = {
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
                "dates" : "2015",
                "description" : "Build dynamic online résumé",
                "images" : []
            }
        ]
    };// ./appData.projects


    /**
     * Create and populate the object containing education information
     *
     * @type {Object}
     */
    appData.education = {
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
    };// ./appData.education


    /**
     * Create and populate an object containing template information, for
     * extension to the base project
     *
     * @type {Object}
     */
    appData.TEMPLATES = {
        "BLK_CONTROLS" : "<section class=\"controls sleep\"></section>",
        "ARO_BUTTON" : "<div class=\"aroCtl blockRoot\"><div class=\"target\"></div><div class=\"inner\"></div></div>",
        "PAGE_UP" : "<div class=\"aroCtl arrow pageUp\"></div>",
        "PAGE_DOWN" : "<div class=\"aroCtl arrow pageDown\"></div>"
    };// ./appData.TEMPLATES
};// ./appData.initialize()

//Load the résumé data into application storage
appData.initialize();


/////////////////////////////////////////////////////////////
// Encapsulate the data display functions into the objects //
/////////////////////////////////////////////////////////////

/**
 * Add the basic biographical information to the page
 * @param  {object} bio Biographical data object
 * @return {undefined}
 */
appData.bio.display = function (bio) {
    'use strict';
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
};// ./appData.bio.display(bio)


/**
 * Add the employment history details to the page.
 *
 * @param  {object} work work experience information
 * @return {undefined}
 */
appData.work.display = function (work) {
    'use strict';
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
};// ./appData.work.display(work)


/**
 * Add the project information to the web page
 *
 * @param  {object} work work experience information
 * @return {undefined}
 */
appData.projects.display = function (projects) {
    'use strict';
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
};// ./appData.projects.display(projects)


/**
 * Add the education information to the web page
 *
 * @param  {object} education shools and other education sources
 * @return {undefined}
 */
appData.education.display = function (education) {
    'use strict';
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
};// ./appData.education.display(education)


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
    var ctl;

    // Common functions to support controls
    root.controls = {};
    ctl = root.controls;

    // Create a place to store the global configuration information.  This is
    // (to be) managed by the page level configuration tool, and accessed by
    // (at least) the control block reset functions.
    ctl.configuration = {};

    /**
     * Add control to change page to internationalized content
     * @return {undefined}
     */
    ctl.showInternationalize = function () {
        /*global internationalizeButton */
        $('#main').append(internationalizeButton);
    };// ./showInternationalize = function ()

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
    ctl.isNonEmptyObject = function (obj) {
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
     * configure a pageable section block of controls to their starting state
     * @param  {jQuery Selector} controlRoot wrapper for the block of controls
     * @return {undefined}
     */
    ctl.resetBlock = function (controlRoot) {
        var controlEle, rowSelector, rowEles, totalRows, blockConfig,
            blockOverflow, blockPageLimit;
        controlEle = $(controlRoot);// control block wrapper
        // get block configuration settings, or default to an empty objectd
        blockConfig = controlEle.data().config || {};
        if (typeof blockConfig.rowSelector === 'string') {
            // A (potentially) pageable block
            rowSelector = blockConfig.rowSelector; //tag for line/row in 'page'
            rowEles = controlEle.parent().children(rowSelector);//populated rows
            totalRows = rowEles.length;

            // Get or set default for full page length (no next page), and row
            // limit when there are more pages.
            blockOverflow = blockConfig.overflow || totalRows;
            blockPageLimit = blockConfig.pageLimit || blockOverflow;
            if (totalRows > blockOverflow) {
                //Setup to show only the first page worth of rows
                rowEles.slice(0, blockPageLimit)
                    .removeClass(appData.CONST.ROW_HIDE);
                rowEles.slice(blockPageLimit)
                    .addClass(appData.CONST.ROW_HIDE);
            } else {
                //Few enough rows to display them all to start
                rowEles.removeClass(appData.CONST.ROW_HIDE);
            }
        }
        // reset the control states too
        // Hide everything except the activation symbol / marker / icon
        controlEle.children().slice(1).addClass(appData.CONST.SLEEP_CONTROL);
        controlEle.children().first().removeClass(appData.CONST.SLEEP_CONTROL);
        // The wrapper is created 'sleeping' to avoid some flicker, so need to
        // wake it up (at least) the first time
        controlEle.removeClass(appData.CONST.SLEEP_CONTROL);
    };// ./resetBlock(controlRoot)

    /**
     * [addBlockControls description]
     * @param {selector} parentEle   jQuery Selector for root element of block
     *                               to add controls to
     * @param {object}   options     configuration information for the controls
     *                               of the block
     * @return {undefined}
     */
    ctl.addBlockControls = function (parentEle, options) {
        var controlEle;
        controlEle = $(appData.TEMPLATES.BLK_CONTROLS);//basic wrapper
        controlEle.append(appData.TEMPLATES.ARO_BUTTON);//root control for block
        options.build(controlEle, options, parentEle);//add needed controls
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
        var wrapperEle = $(controlBlockWrapper);
        if (!$.isPlainObject(options)) {
            throw new TypeError(
                'No options supplied to build pageable control block'
            );
        }
        wrapperEle.data('config', options);

        ///////////////////////////////////////////////
        //Individual control elements from templates //
        ///////////////////////////////////////////////
        if ($.isArray(options.controlSet)) {
            //Some control templates were specified
            options.controlSet.forEach(function (ctlTemplate) {
                wrapperEle.append(appData.TEMPLATES[ctlTemplate]);
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
     * Trace event path information to locate the (nearest parent) control
     *
     * @param  {eventObject} evObj jQuery event object for control delegate
     * @return {jQueryElement}     The matched control element (or null)
     */
    ctl.locateEventControl = function (evObj) {
        /**
         * Recursive closure function to locate the actual control element in
         * the delegate event path (chain)
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
    ctl.getControlFunction = function (ctlClass) {//ctlEle if class not enough
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

    ctl.toggleControls = function (ctlEle, blkConfig) {
        var rowEles, blockOverflow, pageGroup;
        //Use the current state to decide whether need to show or hide controls
        blkConfig.state = blkConfig.state ||
            appData.CONST.COLLAPSED;//Initialize when state does not yet exist
        if (blkConfig.state === appData.CONST.COLLAPSED) {
            console.log('open controls');
            // Only the root of the control set is currently being shown: Open
            // up the next level

            //Use the embeded configuration information to figure out what to do
            if (typeof blkConfig.rowSelector === 'string') {
                console.log(blkConfig.rowSelector);
                //Looks like paging controls may be needed.
                rowEles = $(blkConfig.rowSelector);
                // Get or set default for full page length (no next page), and
                // row limit when there are more pages available.
                blockOverflow = blkConfig.overflow || rowEles.length;
                //blockPageLimit = blkConfig.pageLimit || blockOverflow;
                if (rowEles.length > blockOverflow) {
                    // wake up the known paging controls
                    console.log('wake paging');
                    //Considered using an array in CONST to hold the list of
                    // paging controls to wakeup here, but decided that further
                    // logic is going to manage which controls to display based
                    // on the actual data.  Use a local array instead that can
                    // be populated programmatically (just) before getting here.
                    pageGroup = ['.pageUp', '.pageDown'];
                    pageGroup.forEach(function (mask) {
                        ctlEle.children(mask).
                            removeClass(appData.CONST.SLEEP_CONTROL);
                    });
                    blkConfig.state = appData.CONST.PAGING;
                } // else { !(rowEles.length > blockOverflow)
                    // Too few rows to ever need any paging controls
                //}
                // TODO: controls to show more or less details, hide all show all
                // another section of the configiration object?
            }// ./if (typeof blkConfig.rowSelector === 'string')
        } else { // !(blkConfig.state === 'closed')
            console.log('close controls');
            // The root was clicked with other controls open; close all of the
            // child controls in the set, except for the first / root controld
            ctlEle.children('.aroCtl').slice(1).
                addClass(appData.CONST.SLEEP_CONTROL);
            blkConfig.state = appData.CONST.COLLAPSED;
        }// ./else !(blkConfig.state === 'closed')
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
    };// ./toggleControls(ctlEle, blkConfig)

    ctl.processPageUp = function (ctlEle, blkConfig) {
        console.log('processPageUp stub');
    };// ./processPageUp(ctlEle, blkConfig)

};// ./appData.app.build(root)

/**
 * bind the handlers needed for interactive functionality
 * @param  {[type]} root [description]
 * @return {undefined}
 */
appData.app.initialize = function (root) {
    'use strict';
    var ctl = root.controls;

    /**
     * Handle all of the click events for all control function blocks
     * A single delate handler, instead of attaching a handler to each control
     *
     * @return {undefined}
     */
    ctl.baseClick = function (e) {
        var ctlEle, ctlConfiguration, ctlTarget, ctlFunction;
        console.log('baseClick');

        // A bit of sanity check validation
        ctlEle = $(this);
        if (ctlEle.length !== 1) {
            throw new TypeError('"this" is not a valid element in baseClick');
        }
        console.log(ctlEle.attr('class'));
        ctlConfiguration = ctlEle.data().config;
        if (!ctl.isNonEmptyObject(ctlConfiguration)) {
            throw new TypeError('No configuration data supplied for element ' +
                'delegated to in baseClick');
        }

        // LOGIC QUERY:
        //Is class going to be enough to both find the top element for any
        //control in the block, and to uniquely identify which control it is
        //once found?
        //For css control graphics, the set of classes is going have to be
        //unique, as long as the visual image for each control is unique.
        //That does not mean that a single class is enough to be unique, so
        //be careful.  EG: "arrow pageup", "text pageup"
        ctlTarget = ctl.locateEventControl(e);
        console.log(ctlTarget.attr('class'));
        //ctlFunction = ctl.getControlFunction(ctlTarget); //only if need more
        ctlFunction = ctl.getControlFunction(ctlTarget.attr('class'));
        console.log(ctlFunction);
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
            ctl.toggleControls(ctlEle, ctlConfiguration);
            break;
        case 1:
            ctl.processPageUp(ctlEle, ctlConfiguration);
            break;
        default:
            throw new RangeError('identified function was not processed');
        }

    };// ./baseClick(e)

    //Setup event delegate handlers for the interactive controls
    $('#main').on('mouseenter', '.aroCtl', function () {
        console.log('mouseenter ARO');
        console.log($(this).parent().data());
        $(this).addClass(appData.CONST.WAKE_CONTROL);
    });
    $('#main').on('mouseleave', '.aroCtl', function () {
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
