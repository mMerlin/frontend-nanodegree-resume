/*jslint browser: true, devel: true, todo: true, indent: 4, maxlen: 82 */
/*global $ */

/**
 * Return the internationaized version of a full name
 *
 * Direct function, instead of object property value as function, because it is
 * referenced from pre-written helper code.
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

// Run the outer anonymous function when the DOM is ready.
$(function () {
    'use strict';
    var baseForApp = 'appData';
    // Moving the application to another namespace, relative to the gloabl
    // namespace, should only require changing the value passed into the
    // nested anonymous function below.  Additional work will be needed if
    // the namespace is not top level.  IE 'net.company.appname' would not
    // work with the code as is.

    // Use an inner self-running anonymous function to kick things off.  Needed
    // to be able to pass a value in when it is invoked.  I could not see a way
    // to do that directly using $(function(){})
    (function (glbRoot) {
        var base;
        if (window[glbRoot] === undefined) {
            // Setup the root global variable: this is the only thing (not part of
            // the helper code) that should use the global name space.
            window[glbRoot] = {};
        }
        base = window[glbRoot];

        // Template information, for extensions to the base project
        base.TEMPLATES = {
            'BLK_CONTROLS' : '<section class="controls sleep"></section>',
            'CTL_MENU_ITEM' : '<div class="%data%"></div>',
            'CTL_NEST_ITEM' : '<span class="iconNested"></span>',
            'URL_WRAPPER' : '<a href="%data%" class="permalink"></a>',
            'IMAGES_START' : '<ul class="imageList"></ul>',
            'IMAGE_HOLDER' : '<li></li>',
            'BARE_ANCHOR' : '<a></a>',
            'IMAGE_DESCRIPTION' : '%data% project image %data%',
            'EVENING_CLASSES' : '<h3>Day and Evening Classes</h3>'
        };// ./base.TEMPLATES

        // Simple constants, used to avoid duplicate literal values that could get
        // missed while refactoring, or doing global changes.
        base.CONST = {
            'DATA_PLACEHOLDER' : '%data%',// common replacement string
            'ROW_HIDE_TAG' : 'rowHide',// css class; hide rows when paging
            'WAKE_CONTROL' : 'awake',// css class; show controls as awake (hover)
            'SLEEP_CONTROL' : 'sleep',// css class; hide unavailable controls
            'COLLAPSED' : 'closed',// control block state collapsed/closed state
            'PAGING' : 'paging',// control block has [some] page management active
            'MENU_TAG' : 'menuOpenClose',
            'PAGE_RESET_TAG' : "pageReset",
            'PAGE_ALL_ROWS_TAG' : "pageAllRows",
            'PAGE_PREVIOUS_TAG' : "pagePrevious",
            'PAGE_NEXT_TAG' : "pageNext",
            'CONTROL_SELECTOR' : '.controls > div',// > span | > *
            'MORE_SKILLS_TAG' : 'moreSkills',
            'LESS_SKILLS_TAG' : 'lessSkills',
            /*
                'pageFirst',
                'pageLast',
                'pageIncrease',// more rows in page
                'pageDecrease',// less rows in page
                'pageLess',// fewer details
                'pageMore',// More details
            */
            'START_STATE' : 'working',// Page state analysis started
            'FINAL_STATE' : 'complete',// Page state analysis started
            'ERROR_STATE' : 'error'// Page state analysis started
        };// ./base.CONST
        // Fill in some dependent constants that are inconvenient to add directly
        // to the object literal, without duplicating the original content
        base.CONST.CONTROL_FUNCTIONS = [// based on css class tags
            base.CONST.MENU_TAG,
            base.CONST.PAGE_PREVIOUS_TAG,
            base.CONST.PAGE_NEXT_TAG,
            base.CONST.PAGE_ALL_ROWS_TAG,
            base.CONST.PAGE_RESET_TAG
        ];
        // icons needing a nested element to hood css graphics to
        base.CONST.NESTED_CONTROLS = [
            base.CONST.PAGE_ALL_ROWS_TAG
        ];
        base.CONST.SLEEP_SELECTOR = '.' + base.CONST.SLEEP_CONTROL;
        base.CONST.ROW_HIDE_SELECTOR = '.' + base.CONST.ROW_HIDE_TAG;
        base.CONST.MENU_SELECTOR = '.' + base.CONST.MENU_TAG;
        base.CONST.MORE_SKILLS_SELECTOR = '.' + base.CONST.MORE_SKILLS_TAG;
        base.CONST.PAGE_PREVIOUS_SELECTOR = '.' + base.CONST.PAGE_PREVIOUS_TAG;
        base.CONST.PAGE_NEXT_SELECTOR = '.' + base.CONST.PAGE_NEXT_TAG;
        base.CONST.PAGE_ALL_ROWS_SELECTOR = '.' + base.CONST.PAGE_ALL_ROWS_TAG;
        base.CONST.PAGE_RESET_SELECTOR = '.' + base.CONST.PAGE_RESET_TAG;

        /**
         * Wrapper to load the main résumé objects
         * @return {undefined}
         */
        base.initialize = function (dataRoot) {
            //Tell jslint to allow long lines in the JSON data structures
            /*jslint maxlen: 150 */

            /*
                The Front-End Developer nanodegree course style guide
                http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html
                says to use single quotes for JavaScript strings, but double quotes are
                required for json.  Which the course is also using for definition of the
                base objects.

                The styleguide says to use string concatenation to break long lines, but
                that is not valid when complying with JSON syntax.
             */

            /**
             * Create and populate the object containing general biographical
             * information for the résumé using a JSON format object definition
             *
             * @type {Object}
             */
            dataRoot.bio = {
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
                    "twitter" :         "HPhilDuby",
                    "location" :        "Calgary, AB, Canada",
                    "postal" : {
                        "Country" :     "Canada",
                        "city" :        "Calgary",
                        "stateProv" :   "AB",
                        "zipPostal" :   "T3B 4N3",
                        "street1" :     "27 Silversprings Drive NW",
                        "street2" :     "Unit 66"
                    },
                    "urls" : {
                        "email" :       "mailto:philduby@phriendly.net",
                        "github" :      "https://github.com/mMerlin/mMerlin.github.io",
                        "twitter" :     "https://twitter.com/HPhilDuby"
                    }
                },
                "welcomeMessage" :      "Thank-you for visiting my web page.",
                "skills" : [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "jQuery",
                    "C",
                    "C#",
                    "Python",
                    "PHP",
                    "Ruby",
                    "Basic",
                    "VBA",
                    "Visual Basic",
                    "Java",
                    "ASP",
                    "ASP.NET",
                    "MySql",
                    "XML",
                    "analysis",
                    "desktop support"
                ],
                "moreSkills" : [
                    "Fortran",
                    "COBOL",
                    "RoR",
                    "C++",
                    "Pascal",
                    "Assember",
                    "MS SQL",
                    "Powerhouse",
                    "Corvision",
                    "Smartstar",
                    "MS Access",
                    "Intergraph"
                ],
                "biopic" :              "images/biopic.jpg"
            };// ./dataRoot.bio

            // Encapsulate the bio display function into the object
            /**
             * Add the basic biographical information to the page
             * @param  {object} bio Biographical data object
             * @return {undefined}
             */
            dataRoot.bio.display = function (bio) {
                /*global HTMLheaderRole, HTMLheaderName, HTMLmobile, HTMLemail,
                    HTMLgithub, HTMLtwitter, HTMLblog, HTMLlocation, HTMLbioPic,
                    HTMLWelcomeMsg */
                var formattedHtml, PLC_HLD, wrapperEle;//[also] used in inner closure scope
                PLC_HLD = base.CONST.DATA_PLACEHOLDER;
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
                    var urlWrapper;
                    if (bio.contacts[dataSource]) {
                        // Have data for this contact source
                        formattedHtml = template.replace(PLC_HLD,
                            bio.contacts[dataSource]
                            );
                        if (bio.contacts.urls[dataSource]) {
                            // Have a url to go along with the raw data; convert the
                            // body/content of the formatted (li) element into a link
                            urlWrapper = base.TEMPLATES.URL_WRAPPER.replace(
                                PLC_HLD,
                                bio.contacts.urls[dataSource]
                            );
                            formattedHtml = $(formattedHtml);
                            formattedHtml.wrapInner(urlWrapper);
                        }
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

                function showAllSkills() {
                    /*global HTMLskillsStart, HTMLskills */
                    var skillsBlock, skillEle, moreStart;

                    /**
                     * Add a single skill entry to the page
                     * @param  {string} singleSkill The name/description for a single skill
                     * @return {undefined}
                     */
                    function addOneSkill(singleSkill) {
                        formattedHtml = HTMLskills.replace(PLC_HLD, singleSkill);
                        wrapperEle.append(formattedHtml);
                    }// ./addOneSkill(singleSkill)

                    skillsBlock = $(HTMLskillsStart);// Keep 'local' until populated
                    wrapperEle = skillsBlock.last();// The '#skills' element
                    bio.skills.forEach(addOneSkill);//append all skills listed

                    // Add any extra skills that are to be initially hidden, but can be
                    // shown by user choice
                    if ($.isArray(bio.moreSkills) && bio.moreSkills.length > 0) {
                        // Save the index where the first extended skill will be stored.
                        moreStart = wrapperEle.children().length;
                        bio.moreSkills.forEach(addOneSkill);

                        // Append an extra dummy skill to use for the More/Less button
                        formattedHtml = HTMLskills.replace(PLC_HLD, '');
                        skillEle = $(formattedHtml);
                        skillEle.addClass(base.CONST.MORE_SKILLS_TAG);
                        skillEle.addClass('skillsButton');
                        wrapperEle.append(skillEle);

                        // Add a tag to the last 'regular' skill, so that the added
                        // elements can be found (as a block) later.  This is the stop
                        // marker to use with .prevUntil
                        $(wrapperEle.children()[moreStart - 1]).attr('data-tag', 'lastShownSkill');

                        // Mark all of the extra skills to not be displayed (initially)
                        wrapperEle.children().not(base.CONST.MORE_SKILLS_SELECTOR).
                            slice(moreStart).addClass(base.CONST.ROW_HIDE_TAG);
                    }

                    // Add the fully populated skills block to the page header
                    $('#header').append(skillsBlock);
                }// .showAllSkills()

                // Add the skills summary to the header: only when skills exist
                if ($.isArray(bio.skills) && bio.skills.length > 0) {
                    showAllSkills();
                }
            };// ./dataRoot.bio.display(bio)


            /**
             * Create and populate the object containing work history information
             * for the résumé using a JSON format object definition
             *
             * @type {Object}
             */
            dataRoot.work = {
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
                    "defaultOverflow" : 6,
                    "defaultPageLimit" : 5
                }
            };// ./dataRoot.work
            // Populate the config.controlSet information outside of the JSON
            // data block, so that declared constant values can be used instead
            // of literal strings.
            dataRoot.work.config.controlSet = [
                base.CONST.PAGE_RESET_TAG,
                base.CONST.PAGE_ALL_ROWS_TAG,
                base.CONST.PAGE_PREVIOUS_TAG,
                base.CONST.PAGE_NEXT_TAG
            ];
            //resume controls.mm

            // Encapsulate the work history display function into the object
            /**
             * Add the employment history details to the page.
             *
             * @param  {object} work work experience information
             * @return {undefined}
             */
            dataRoot.work.display = function (work) {
                /*global HTMLworkStart, HTMLworkEmployer, HTMLworkTitle, HTMLworkLocation,
                    HTMLworkDates, HTMLworkDescription */
                var jobNum, jobEle, fmtEmployer, formattedHtml, PLC_HLD;
                PLC_HLD = base.CONST.DATA_PLACEHOLDER;

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
                    work.config.build = base.controls.buildPageable;

                    base.controls.addBlockControls('#workExperience', work.config);
                }
            };// ./dataRoot.work.display(work)


            /**
             * Create and populate the object containing featured project
             * information for the résumé using a JSON format object definition
             *
             * @type {Object}
             */
            dataRoot.projects = {
                "projects" : [
                    {
                        "title" :       "Page Mockup",
                        "dates" :       "2014",
                        "description" :
                            "create web page using bootstrap framework to match provided mockup image",
                        "images" : [
                            "images/MockupHint.gif",
                            "MockupMug.jpg",
                            "MockupSite",
                            "MockupTest"
                        ],
                        "imageProperties" : {
                            "images/MockupHint.gif" : {
                                "src" : "images/MockupHintThumb.jpg",
                                "url" : "images/MockupHint.gif",
                                "alt" : "Thumbnail linked to image of hint from course instructor notes"
                            },
                            "MockupMug.jpg" : {
                                "src" : "images/MockupMugThumb.jpg",
                                "url" : "images/MockupMug.jpg",
                                "alt" : "Thumbnail linked to image of extract from created Mockup page"
                            },
                            "MockupSite" : {
                                "src" : "images/MockupSiteThumb.jpg",
                                "url" : "http://mmerlin.github.io/mug-mockup/",
                                "alt" : "Thumbnail linked to site created from mockup"
                            },
                            "MockupTest" : {
                                "src" : "images/MockupTestThumb.jpg",
                                "url" : "images/MockupTest.gif",
                                "alt" : "Thumbnail linked to image of automated test result"
                            }
                        },
                        "url" :         "https://github.com/mMerlin/mug-mockup"
                    },
                    {
                        "title" :       "Interactive Résumé",
                        "dates" :       "2015",
                        "description" :
                            "Build dynamic online résumé.&nbsp; You’re looking at a descendent of it!",
                        "images" : [
                            "images/MenuClosedAndAwake.gif",
                            "images/MenuOpenOnAll.gif"
                        ],
                        "imageProperties" : {
                            "images/MenuClosedAndAwake.gif" : {
                                "src" : "images/MenuCLosedAwakeThumb.jpg",
                                "url" : "images/MenuClosedAndAwake.gif",
                                "alt" : "Thumbnail linked to image showing the icon to open the paging menu"
                            },
                            "images/MenuOpenOnAll.gif" : {
                                "src" : "images/MenuOpenOnAllThumb.jpg",
                                "url" : "images/MenuOpenOnAll.gif",
                                "alt" : "Thumbnail linked to image showing the opened paging menu"
                            }
                        },
                        "url" :         "https://github.com/mMerlin/resume"
                    }
                ]
            };// ./dataRoot.projects

            // Encapsulate the project display function into the object
            /**
             * Add the project information to the web page
             *
             * @param  {object} projects project experience information
             * @return {undefined}
             */
            dataRoot.projects.display = function (projects) {
                var PLC_HLD;
                PLC_HLD = base.CONST.DATA_PLACEHOLDER;//for nested functions

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
                    var prjEle, imgWrap, tmpEle, img, propObj, imgKey, attrVal, formattedHtml;
                    //$('#projects').append(HTMLprojectStart);
                    //prjEle = $('.project-entry:last');//The just added project wrapper element
                    prjEle = $(HTMLprojectStart);//Keep off the page until loaded

                    formattedHtml = HTMLprojectTitle.replace(PLC_HLD,
                        projectObject.title || 'no project title'
                        );
                    tmpEle = $(formattedHtml);
                    if (projectObject.url) {
                        //There is a url to go along with the project; fill it in
                        tmpEle.attr('href', projectObject.url);
                    }
                    prjEle.append(tmpEle);

                    formattedHtml = HTMLprojectDates.replace(PLC_HLD,
                        projectObject.dates || 'no project dates'
                        );
                    prjEle.append(formattedHtml);

                    formattedHtml = HTMLprojectDescription.replace(PLC_HLD,
                        projectObject.description || 'no project description'
                        );
                    prjEle.append(formattedHtml);

                    // Makesure image properties exist, even if they are empty
                    projectObject.imageProperties = projectObject.imageProperties || {};
                    // Create a wrapper for the images, so that they can easily be formatted
                    // to float and wrap
                    imgWrap = $(base.TEMPLATES.IMAGES_START);
                    for (img = 0; img < projectObject.images.length; img += 1) {
                        // Prefer to use array of objects for the initial images with
                        // thumbnails and associated links to the larger version, but
                        // did not want to change the structure defined for the
                        // projects.  So just extended with (optional) parallel
                        // information instead.
                        imgKey = projectObject.images[img];
                        propObj = projectObject.imageProperties[imgKey] || {};
                        attrVal = propObj.src || imgKey;
                        formattedHtml = HTMLprojectImage.replace(PLC_HLD, attrVal);
                        tmpEle = $(formattedHtml);

                        attrVal = propObj.alt || base.TEMPLATES.IMAGE_DESCRIPTION.replace(
                            PLC_HLD,
                            projectObject.title
                        ).replace(PLC_HLD, img + 1);
                        tmpEle.attr('alt', attrVal);

                        if (propObj.url) {
                            tmpEle = $(base.TEMPLATES.BARE_ANCHOR).append(tmpEle);
                            tmpEle.attr('href', propObj.url);
                        }
                        imgWrap.append($(base.TEMPLATES.IMAGE_HOLDER).append(tmpEle));
                    }
                    prjEle.append(imgWrap);
                    $('#projects').append(prjEle);
                }// ./addOneProject(projectObject)

                projects.projects.forEach(addOneProject);
            };// ./dataRoot.projects.display(projects)


            /**
             * Create and populate the object containing education information
             * for the résumé using a JSON format object definition
             *
             * @type {Object}
             */
            dataRoot.education = {
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
                        "dates" :       "in progress",
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
                ],
                "eveningCourses" : [
                    {
                        "title" :       "JavaScript",
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "dates" :       2011,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "PHP and MySql",
                        "dates" :       2011,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Adobe Flash CS5",
                        "dates" :       2011,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Adobe Photoshop CS5",
                        "dates" :       2011,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Adobe Illustrator CS5",
                        "dates" :       2010,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Microsoft SQL Server [2008 R2] Introduction",
                        "dates" :       2010,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Object Oriented Progamming Fundamentals [Java with Netbeans]",
                        "dates" :       2010,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Microsoft .NET Introduction [VB.NET 2010]",
                        "dates" :       2010,
                        "url" :         "http://ucalgary.ca/"
                    },
                    {
                        "school" :      "University of Calgary",
                        "location" :    "Calgary, AB, Canada",
                        "title" :       "Microsoft Office Specialist, Excel 2007",
                        "dates" :       2010,
                        "url" :         "http://ucalgary.ca/"
                    }
                ]
            };// ./dataRoot.education

            // Encapsulate the education display function into the object
            /**
             * Add the education information to the web page
             *
             * @param  {object} education shools and other education sources
             * @return {undefined}
             */
            dataRoot.education.display = function (education) {
                /*global HTMLonlineClasses, HTMLschoolName, HTMLschoolDegree,
                    HTMLschoolDates, HTMLonlineTitle, HTMLonlineSchool,
                    HTMLonlineDates */
                var formattedHtml, PLC_HLD, eduRoot, eduSource, showURL;
                // vars (also) used for nested functions (closure scope)
                PLC_HLD = base.CONST.DATA_PLACEHOLDER;//for nested functions

                if (!($.isPlainObject(education) && $.isArray(education.schools))) {
                    //Major problem. This is not going to work, no practical runtime recovery
                    return false;
                }

                /**
                 * Add all details for a single education instance to the page
                 *
                 * This handles schools, online courses, and evening courses.  They all
                 * have similar data and formatting.  There are just enough differences
                 * to make refactoring to a single function a bit tricky.  Especially
                 * while trying to keep the processing fairly generic.  Needed a bit of
                 * special case hard-coding.
                 *
                 * @param {object} educationObject Object with properties holding
                 *                                 education instance details
                 * @return {undefined}
                 */
                function addEducation(educationObject) {
                    /*global HTMLschoolStart, HTMLschoolLocation, HTMLschoolMajor,
                        HTMLonlineURL */
                    var eduEle, firstPart, tmpEle, mjr;

                    // I like populating a local element before adding, instead of using
                    // :last or .last() to get it back to add children.  This works even
                    // if there is no convenient tag to identify the added element.
                    //eduRoot.append(HTMLschoolStart);
                    //eduEle = $('.education-entry:last');//The just added wrapper element
                    //eduEle = eduRoot.last();//The just added wrapper element
                    eduEle = $(HTMLschoolStart);// New empty wrapper

                    firstPart = eduSource.firstTemplate.replace(PLC_HLD,
                        educationObject[eduSource.firstData] || 'no title specified'
                        );
                    formattedHtml = eduSource.secondTemplate.replace(PLC_HLD,
                        educationObject[eduSource.secondData] || 'no degree or school'
                        );
                    tmpEle = $(firstPart + formattedHtml);

                    if (educationObject.url) {
                        // Fill in the link to the school (and degree) or specific course
                        tmpEle.attr('href', educationObject.url);
                    }
                    eduEle.append(tmpEle);

                    if (educationObject.location) {
                        formattedHtml = HTMLschoolLocation.replace(PLC_HLD,
                            educationObject.location
                            );
                        eduEle.append(formattedHtml);
                    }

                    formattedHtml = eduSource.dates.replace(PLC_HLD,
                        educationObject.dates || 'no dates'
                        );
                    eduEle.append(formattedHtml);

                    if ($.isArray(educationObject.majors)) {
                        for (mjr = 0; mjr < educationObject.majors.length; mjr += 1) {
                            formattedHtml = HTMLschoolMajor.replace(PLC_HLD,
                                educationObject.majors[mjr]
                                );
                            eduEle.append(formattedHtml);
                        }// ./for
                    }// ./($.isArray(educationObject.majors))

                    // currently the only thing that distinguishes between the data for
                    // an online versus evening course, is that evening MIGHT have a
                    // location entry for the school.  That is not enough for safe
                    // separation, but only online has the explicit URL entry.  Need to
                    // use closure scope to get the caller to tell us when to show it.
                    if (showURL) {
                        formattedHtml = HTMLonlineURL.replace(PLC_HLD,
                            educationObject.url || 'no url specified'
                            );
                        tmpEle = $(formattedHtml);
                        if (educationObject.url) {
                            // If a url exists, use it to create the link
                            tmpEle.last().attr('href', educationObject.url);
                        }
                        eduEle.append(tmpEle);
                    }

                    eduRoot.append(eduEle);
                }// ./addEducation(educationObject)

                eduRoot = $('#education');

                showURL = false;
                eduSource = {
                    'firstTemplate' : HTMLschoolName,
                    'firstData' : 'name',
                    'secondTemplate' : HTMLschoolDegree,
                    'secondData' : 'degree',
                    'dates' : HTMLschoolDates
                    // currently HTMLschoolDates === HTMLonlineDates, but since they are
                    // specified separately, keep them separate here too by using lookup
                };
                education.schools.forEach(addEducation);

                eduSource = {
                    'firstTemplate' : HTMLonlineTitle,
                    'firstData' : 'title',
                    'secondTemplate' : HTMLonlineSchool,
                    'secondData' : 'school',
                    'dates' : HTMLonlineDates
                };
                if ($.isArray(education.onlineCourses)) {
                    // At least one online course exists.  Insert the header, followed
                    // by details for each course
                    showURL = true;
                    eduRoot.append(HTMLonlineClasses);
                    education.onlineCourses.forEach(addEducation);
                }

                if ($.isArray(education.eveningCourses)) {
                    showURL = false;
                    eduRoot.append(base.TEMPLATES.EVENING_CLASSES);
                    education.eveningCourses.forEach(addEducation);
                }

                // TODO: may need to sneak another wrapper around the separate groups
                // of education-entry blocks: to be able to add separate paging
                // controls to each group.  If I added the existing controls to
                // #education, all sets would be included in the same paging logic, so
                // the first page would be regular schools, and maybe the first of the
                // online courses.  The last page would be all evening courses.
                // Potentially interesting effect, since the block headers would always
                // remain visible.  Rolling accordion style
            };// ./dataRoot.education.display(education)
        };// ./base.initialize(dataRoot)

        /**
         * Build the map to show on the page
         * @return {undefined}
         */
        base.showMap = function () {
            /*global googleMap */
            $('#mapDiv').append(googleMap);
        };// ./base.showMap()

        base.app = {};
        /**
         * Encapsulate the creation of (function) resources for the application
         * @param  {Object} root The base object for the application
         * @return {undefined}
         */
        base.app.build = function (ctlRoot) {
            var ctl, PLC_HLD, isNonEmptyObject, locateEventControl,
                getControlFunction, toggleControls, showActiveControls,
                showUpdatedPage, processPagePrevious, processPageNext,
                processPageAllRows, processPageReset, buildPageState;
            PLC_HLD = base.CONST.DATA_PLACEHOLDER;

            // Common functions to support controls
            ctlRoot.controls = {};
            ctl = ctlRoot.controls;

            /////////////////////////////////////////////////////////////
            // Local helper and utility functions: local/closure scope //
            /////////////////////////////////////////////////////////////

            /**
             * Detect non empty plain objects.
             * @param  {object}  obj object to be tested
             * @return {Boolean}     passed obj is a plain (non Array) object
             *                       with at least one of its own properties
             *
             * Similar to jQuery.isEmptyObject(). but excludes prototype
             * inherited properties by checking getOwnPropertyNames or
             * hasOwnProperty
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
             * @param  {eventObject} evObj jQuery event object for delegated evnt
             * @return {jQueryElement}     The matched control element (or null)
             */
            locateEventControl = function (evObj) {
                /**
                 * Recursive closure function to locate the actual control element
                 * in the delegate event path (chain)
                 *
                 * @param  {DOMelement} ele DOM element to start/continue search
                 *                          from
                 * @return {jQueryElement}  The matched control element (or null)
                 */
                function walkUpFrom(ele) {
                    var jqEle;
                    jqEle = $(ele);
                    // The control element (icon) is a direct child of the target
                    // for the delegated event.
                    if (ele.parentElement === evObj.currentTarget) {
                        return jqEle;
                    }
                    return walkUpFrom(ele.parentElement);
                }// ./walkUpFrom(ele)

                return walkUpFrom(evObj.target);
            };// ./locateEventControl(evObj)

            /**
             * Determine the function that using the control triggers
             * @param  {string} ctlClass class name string for a control element
             * @return {integer}         function identifier for the associated
             *                           control
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
                    throw new RangeError(
                        'no function tags exist for control element'
                    );
                }
                // Process active classes in descending order: the match is most
                // likely at the end
                for (cls = classes.length - 1; cls >= 0; cls -= 1) {
                    ctlFunction = base.CONST.CONTROL_FUNCTIONS.
                        indexOf(classes[cls]);
                    if (ctlFunction >= 0) {
                        return ctlFunction;//Found a tag matching the class name
                    }
                }// ./for
                throw new RangeError(
                    'control element does not have a recognized function tag'
                );
            };// ./getControlFunction(ctlClass)

            /**
             * Show active, or hide all control functions for the block
             * @param  {jQueryElement} ctlEle wrapper element for control block
             * @return {undefined}
             */
            toggleControls = function (ctlEle) {
                var visibleControls;

                // If any controls (other than the menuOpenClose icon) are
                // currently being shown, hide all of additional controls.
                // Otherwise, use the current (control set) data state and
                // configuration to decide what controls should be shown.
                visibleControls = ctlEle.children().
                    not(base.CONST.SLEEP_SELECTOR).
                    not(base.CONST.MENU_SELECTOR);
                if (visibleControls.length > 0) {
                    // The menu icon was clicked with other controls shown; close
                    // the child controls in the set, except for the menu control
                    // itself.
                    visibleControls.addClass(base.CONST.SLEEP_CONTROL);
                } else {
                    // Only the menu of the control set is currently being shown:
                    // Open up the next configured level(s)
                    showActiveControls(ctlEle);
                }
            };// ./toggleControls(ctlEle)

            /**
             * Adjust the displayed control icons, to match the current state of
             * the data being controlled, and the configuration for the control
             * set block.
             * @param  {jQueryElement} ctlEle wrapper element for control block
             * @return {undefined}
             */
            showActiveControls = function (ctlEle) {
                var ctlSetState, displayControls, matchControls;
                // LOGIC QUERY: should buildPageState() be:
                //   buildControlState? buildControlSetState?
                ctlSetState = buildPageState(ctlEle);
                if (ctlSetState.state !== base.CONST.FINAL_STATE) {
                    // non paging would be valid here too, but no case for now
                    throw new ReferenceError(
                        'Show Active Controls references invalid page data'
                    );
                }

                // Always show the menu activation control
                displayControls = [base.CONST.MENU_SELECTOR];

                // Use the embeded configuration information to figure out which
                // controls to work with
                if (typeof ctlSetState.base.rowSelector === 'string') {
                    //Paging controls (at least some) are needed.

                    // Add any(all) always shown Control(s)
                    displayControls.push(base.CONST.PAGE_RESET_SELECTOR);
                    if (ctlSetState.rowCount > ctlSetState.base.overflow) {
                        // More data rows available than fits in the current
                        // overflow limit
                        //
                        // Add control to be able to show all rows at once
                        displayControls.push(base.CONST.PAGE_ALL_ROWS_SELECTOR);
                    }
                    if (ctlSetState.pageTop > 0 ||
                            ctlSetState.pageEnd < ctlSetState.lastRow
                            ) {
                        // Some data rows are not being displayed; turn on the
                        // controls to move forward and back
                        displayControls.push(base.CONST.PAGE_PREVIOUS_SELECTOR,
                            base.CONST.PAGE_NEXT_SELECTOR
                            );
                        // QUERY LOGIC: would be nice to show but disable/ghost
                        //   individual controls when either no previous or no
                        //   next page to move to
                    }
                    // TODO: controls to show more or less details, hide all
                    // increase / decrease page size
                    // help information modal?
                    // another section of the configuration object?
                }// ./if (typeof ctlSetState.base.rowSelector === 'string')

                // List of class names for the controls to be displayed
                matchControls = ctlEle.children(displayControls.join(','));
                ctlEle.children().not(matchControls).
                    addClass(base.CONST.SLEEP_CONTROL);
                matchControls.removeClass(base.CONST.SLEEP_CONTROL);
            };// ./showActiveControls(?)

            /**
             * Collect state information for the [pseudo] page associated with the
             * control block
             *
             * @param  {Element} ctlEle   wrapper jQuery element for the ctl block
             * @return {object}           State information for the current page
             */
            buildPageState = function (ctlEle) {
                var pageState, hiddenRows, row, visibleRows;
                pageState = {};
                pageState.state = base.CONST.START_STATE;

                pageState.base = ctlEle.data().config;
                if (!isNonEmptyObject(pageState.base)) {
                    throw new TypeError(
                        'No configuration data supplied for control element block'
                    );
                }

                if (typeof pageState.base.rowSelector !== 'string') {
                    //pageState.state = base.CONST.FINAL_STATE;
                    //pageState.state = 'notpaging';
                    return pageState;
                }
                pageState.allRows = ctlEle.parent().
                    children(pageState.base.rowSelector);
                pageState.rowCount = pageState.allRows.length;
                pageState.lastRow = pageState.rowCount - 1;

                // locate the currently displayed page: that is the first and
                // last rows without the ROW_HIDE_TAG class
                hiddenRows = pageState.allRows.
                    filter(base.CONST.ROW_HIDE_SELECTOR);
                visibleRows = pageState.rowCount - hiddenRows.length;
                if (visibleRows === pageState.rowCount) {
                    // All rows are visible
                    // LOGIC QUERY: what if rowCount === 0 ?
                    pageState.pageTop = 0;
                    pageState.pageEnd = pageState.lastRow;
                } else if (visibleRows === 0) {
                    // All rows are Hidden
                    pageState.pageTop = 0;
                    pageState.pageEnd = 0;
                } else {
                    // Some but not all rows are hidden: find the non-hidden block
                    for (row = 0; row < pageState.rowCount; row += 1) {
                        // Locate the first non-hidden row
                        if (!$(pageState.allRows[row]).
                                hasClass(base.CONST.ROW_HIDE_TAG)
                                ) {
                            pageState.pageTop = row;
                            row = pageState.rowCount;
                        }
                    }
                    // Verify that enough following rows are also not hidden to
                    // account for the difference in hidden and total row counts.
                    for (row = pageState.pageTop + 1;
                            row < pageState.pageTop + visibleRows; row += 1
                            ) {
                        if ($(pageState.allRows[row]).
                                hasClass(base.CONST.ROW_HIDE_TAG)
                                ) {
                            // Data error: visible rows are not contiqious block
                            throw new RangeError('split page detected');
                        }
                    }
                    pageState.pageEnd = pageState.pageTop + visibleRows - 1;
                }
                pageState.state = base.CONST.FINAL_STATE;

                return pageState;
            };// ./buildPageState(ctlEle)

            showUpdatedPage = function (currentState, newStart) {
                var showStart, showEnd;

                //EDGE CASE: overflow = pageLimit + 1; rowCount = overflow + 2;
                // newStart = 1; would be orphan at both ends, but using overflow
                // goes over the overflow limit.

                //Get values for the row slice ranges: end is one higher than
                // actually used.
                showStart = newStart;
                if (showStart < 0) {
                    showStart = 0;
                }
                if (showStart > currentState.lastRow) {
                    // In case paged forward past the end of data
                    showStart = newStart - currentState.base.pageLimit;
                    /*
                    if (showStart < currentState.pageTop) {
                        // Go back to the same page again
                        showStart = currentState.pageTop;
                        // Really should be nothing to do for this case
                        // return;
                    }
                    */
                    if (showStart > currentState.lastRow) {
                        // In case 'far' past the end of data
                        showStart = currentState.rowCount -
                            currentState.base.pageLimit;
                    }
                }
                // Get base (end) before checking overflow, to prevent skipping
                // rows when adjusting to prevent orphans
                showEnd = showStart + currentState.base.pageLimit;
                if (showStart <=
                        currentState.base.overflow - currentState.base.pageLimit
                        ) {
                    // Prevent orphan rows just before start of current page
                    showStart = 0;
                }
                if (showStart + currentState.base.overflow >=
                        currentState.rowCount
                        ) {
                    // Prevent orphan rows just after the end of the current page
                    showEnd = currentState.rowCount;
                }
                if (showEnd > currentState.rowCount) {
                    showEnd = currentState.rowCount;
                }
                // LOGIC QUERY:
                //If want to show a full page at the end of the document, reduce
                //showStart to showEnd minus pageLimit|overflow when showEnd ===
                //rowCount

                /////////////////////////////
                // Update the visible rows //
                /////////////////////////////

                /* 'simplest' would be to hide all rows, then unhide the showStart
                   to showEnd range.  Cleaner is to only hide any currently
                   visible rows that are not wanted in the resulting page, and
                   only show any rows that are not currently shown, but are
                   needed.  The logic to do that correctly based on the various
                   start and end indicies is non-trival.  This is not 'efficient',
                   but using the jquery .not() selector gives a clean and accurate
                   result. */

                // Hide any currently visible rows to be hidden on the new page.
                currentState.allRows.
                    // slice matches current visible rows
                    slice(currentState.pageTop, currentState.pageEnd + 1).
                    // not matches the rows that should end up visible
                    not(currentState.allRows.slice(showStart, showEnd)).
                    // hide unneeded visible rows
                    addClass(base.CONST.ROW_HIDE_TAG);

                // Show any currently hidden rows that are wanted on the new page.
                currentState.allRows.
                    slice(showStart, showEnd).//new visible
                    not(currentState.allRows.slice(
                        currentState.pageTop,
                        currentState.pageEnd + 1
                    )).// already visible
                    removeClass(base.CONST.ROW_HIDE_TAG);//show rows
            };// ./showUpdatedPage(currentState, newStart)

            /**
             * Back up the display for the controlled section by one page
             *
             * Hide the currently displayed rows, and show the previous rows based
             * on the configured page size.
             *
             * @param  {jQueryElement} ctlEle  Root control for the current block
             * @return {undefined}
             */
            processPagePrevious = function (ctlEle) {
                var pgState;

                pgState = buildPageState(ctlEle);
                if (pgState.state !== base.CONST.FINAL_STATE) {
                    throw new ReferenceError(
                        'page up references invalid page data'
                    );
                }

                // one page backward
                showUpdatedPage(pgState,
                    pgState.pageTop - pgState.base.pageLimit
                    );
            };// ./processPagePrevious(ctlEle)

            /**
             * Advance the display for the controlled section by one page
             *
             * Hide the currently displayed rows, and show the following rows
             * based on the configured page size.
             * LOGIC QUERY:
             * If not enough remaining rows to fill a page:
             * - display a partial page
             * - add enough rows from previous data to fill the page
             * - configuration setting?
             *
             * @param  {jQueryElement} ctlEle  Control set wrapper element
             * @return {undefined}
             */
            processPageNext = function (ctlEle) {
                var pgState;

                pgState = buildPageState(ctlEle);
                if (pgState.state !== base.CONST.FINAL_STATE) {
                    throw new ReferenceError(
                        'page down references invalid page data'
                    );
                }

                // one page forward
                showUpdatedPage(pgState, pgState.pageEnd + 1);
            };// ./processPageNext(ctlEle)

            /**
             * Configure to show all rows as a single page
             * @param  {jQueryElement} ctlEle  Control set wrapper element
             * @return {undefined}
             */
            processPageAllRows = function (ctlEle) {
                var pgState;

                pgState = buildPageState(ctlEle);
                if (pgState.state !== base.CONST.FINAL_STATE) {
                    throw new ReferenceError(
                        'show all page rows references invalid page data'
                    );
                }

                // Adjust page limits so all data fits on a single page
                pgState.base.overflow = pgState.rowCount;
                pgState.base.pageLimit = pgState.rowCount;

                // first (only) page
                showUpdatedPage(pgState, 0);
                // Update active controls after changing configuration
                showActiveControls(ctlEle);
            };// ./processPageAllRows(ctlEle)

            /**
             * Set the page configuration back to the defaults
             * @param  {jQueryElement} ctlEle  Control set wrapper element
             * @return {undefined}
             */
            processPageReset = function (ctlEle) {
                var pgState;

                pgState = buildPageState(ctlEle);
                if (pgState.state !== base.CONST.FINAL_STATE) {
                    throw new ReferenceError(
                        'page reset references invalid page data'
                    );
                }

                // Set the instance limits back to the base configuration values.
                pgState.base.overflow = pgState.base.defaultOverflow;
                pgState.base.pageLimit = pgState.base.defaultPageLimit;

                // first page
                showUpdatedPage(pgState, 0);
                // Update active controls after changing configuration
                showActiveControls(ctlEle);
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
             * Configure a pageable section block of controls to starting state
             *
             * LOGIC QUERY:
             * Might move to helper functions set, when change reference to use
             * event trigger instead of direct call
             *
             * @param  {jQuery Selector} controlRoot wrapper for block of controls
             * @return {undefined}
             */
            ctl.resetBlock = function (controlRoot) {
                var controlEle, blockConfig, pageConfig;
                controlEle = $(controlRoot);// control block wrapper
                // get block configuration settings, or default to an empty object
                blockConfig = controlEle.data().config || {};
                if (typeof blockConfig.rowSelector === 'string') {
                    // A (potentially) pageable block
                    pageConfig = buildPageState(controlEle);

                    // [re]set runtime configuration options to built in defaults
                    pageConfig.base.overflow = pageConfig.base.defaultOverflow;
                    pageConfig.base.pageLimit = pageConfig.base.defaultPageLimit;

                    showUpdatedPage(pageConfig, 0);
                }
                // reset the control states too
                // Hide everything except the menu activation icon
                controlEle.children().addClass(base.CONST.SLEEP_CONTROL);
                controlEle.children(base.CONST.MENU_SELECTOR).
                    removeClass(base.CONST.SLEEP_CONTROL);
                // The wrapper is created 'sleeping' to avoid any flicker, so
                // need to wake it up (at least) the first time.
                controlEle.removeClass(base.CONST.SLEEP_CONTROL);
            };// ./resetBlock(controlRoot)

            /**
             * Create the DOM elements for a block of user interaction controls,
             * populated based on the provided options
             * @param {selector} parentEle   jQuery Selector for wrapper element
             *                               of block to add controls to
             * @param {object}   options     configuration information for the
             *                               controls in the block
             * @return {undefined}
             */
            ctl.addBlockControls = function (parentEle, options) {
                var controlEle;

                // create basic wrapper element
                controlEle = $(base.TEMPLATES.BLK_CONTROLS);
                // Attach a clone of the options object to the wrapper element, to
                // keep any (block instance specific) updates out of the original
                controlEle.data('config', $.extend(true, {}, options));
                options.build(controlEle, parentEle);//add case specific cntrls

                //Add the main open menu control last, to position the control set
                // at the right edge, and 'open' it to the left.
                //Do this here, instead of inside the referenced options.build()
                // function, so that multple generic 'builds' can be done, and
                // still always get the top control last and only once.
                controlEle.append(base.TEMPLATES.CTL_MENU_ITEM.replace(
                    PLC_HLD,
                    base.CONST.MENU_TAG
                ));

                // Insert the populated wrapper as the first child of the parent
                $(parentEle).prepend(controlEle);
            };// ./addBlockControls(parentEle, options)

            /**
             * Create a 'standard' set of controls to handle block content paging
             * @param {jQueryElement} controlBlockWrapper
             *                            wrapper element for block of controls
             * @return {undefined}
             *
             *  ../../Resume Controls.mm
             */
            ctl.buildPageable = function (controlBlockWrapper) {
                var wrapperEle, setOptions;

                wrapperEle = $(controlBlockWrapper);
                setOptions = wrapperEle.data().config;
                if (!$.isPlainObject(setOptions)) {
                    throw new TypeError(
                        'No options supplied to build pageable control block'
                    );
                }

                ////////////////////////////////////////////////
                // Individual control elements from templates //
                ////////////////////////////////////////////////
                if ($.isArray(setOptions.controlSet)) {
                    // Some control functions were specified
                    setOptions.controlSet.forEach(function (ctlFunction) {
                        var newCtl;
                        // Create control item customized with specific function
                        newCtl = $(base.TEMPLATES.CTL_MENU_ITEM.replace(
                            PLC_HLD,
                            ctlFunction
                        ));
                        if (base.CONST.NESTED_CONTROLS.
                                indexOf(ctlFunction) >= 0
                                ) {
                            // Add a child element (only) for controls that need
                            // an extra place to tie the CSS graphics to
                            newCtl.append(base.TEMPLATES.CTL_NEST_ITEM);
                        }
                        wrapperEle.append(newCtl);// Complete control icon
                    });
                }

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
                //  3) let the items flow in the wrapper
            };// ./buildPageable(controlBlockWrapper)

            /**
             * Handle all of the click events for all control function blocks
             * A single delegate handler, instead of attaching a handler to each
             * control
             *
             * @param  {jQuery_Event} e click event
             * @return {undefined}
             */
            ctl.baseClick = function (e) {
                var ctlEle, ctlTarget, ctlFunction;

                // A bit of sanity check validation
                ctlEle = $(this);// The wrapper for the block of controls
                if (ctlEle.length !== 1) {
                    throw new TypeError(
                        '"this" is not a valid element in baseClick'
                    );
                }

                // NOTE: For css control graphics, the set of classes is going
                //   have to be unique, as long as the visual image for each
                //   control is unique.  That does not mean that a single class
                //   is enough to be unique, so be careful.  EG:
                //      "ctlMenuItem pagePrevious", "textMenuItem pagePrevious"
                ctlTarget = locateEventControl(e);
                ctlFunction = getControlFunction(ctlTarget.attr('class'));

                // LOGIC QUERY:
                // using (a bunch) of inner functions for closure would eliminate
                // the need to pass most (or all ) of the parameters to the
                // 'processing' functions.  Or duplicating functionality.  Handle
                // duplication by using a common function, and (if needed)
                // returning an object holding the needed properties
                // NOTE: the switch case indenting may not match the style guide,
                // but is needed to keep jslint happy
                switch (ctlFunction) {// indicies to base.CONST.CONTROL_FUNCTIONS
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

            /**
             * Handle click events to toggle showing of extra skills
             * @return {undefined}
             */
            ctl.moreLessClick = function () {
                //(e) is not used; not specified: sooth jslint
                var ctlEle, skillSet;

                // The element that was clicked, which is designed to be the last
                // skill element, or at least the first element after the last
                // 'more skills' element.
                ctlEle = $(this);

                // Get the set of (skill) elements to work with

                // All of the 'extra' skill entries.  All elements back to the
                // last skill elment that is always shown.
                skillSet = ctlEle.prevUntil('[data-tag="lastShownSkill"]');

                if (ctlEle.hasClass(base.CONST.MORE_SKILLS_TAG)) {
                    // Show the extra skills
                    skillSet.removeClass(base.CONST.ROW_HIDE_TAG);

                    // Switch the button to show Less instead of More
                    ctlEle.removeClass(base.CONST.MORE_SKILLS_TAG);
                    ctlEle.addClass(base.CONST.LESS_SKILLS_TAG);
                } else {
                    // Hide the extra skills
                    skillSet.addClass(base.CONST.ROW_HIDE_TAG);

                    // Switch the button to show More instead of Less
                    ctlEle.removeClass(base.CONST.LESS_SKILLS_TAG);
                    ctlEle.addClass(base.CONST.MORE_SKILLS_TAG);
                }
                //skillEle.addClass('skillsButton');

            };// ./moreLessClick(e)
        };// ./base.app.build(ctlRoot)

        /**
         * bind the handlers needed for interactive functionality
         * @param  {[type]} root [description]
         * @return {undefined}
         */
        base.app.initialize = function (root) {
            var ctl = root.controls;

            //Setup event (and delegate) handlers for the interactive controls
            $('#main').on('mouseenter', base.CONST.CONTROL_SELECTOR, function () {
                $(this).addClass(base.CONST.WAKE_CONTROL);
            });
            $('#main').on('mouseleave', base.CONST.CONTROL_SELECTOR, function () {
                $(this).removeClass(base.CONST.WAKE_CONTROL);
            });
            $('.controls').on('click', ctl.baseClick);
            $('.skillsButton').on('click', ctl.moreLessClick);

            // LOGIC QUERY trigger reset action/event instead of direct function
            // call?
            $.each($('.controls'), function (idx, controlEle) {
                ctl.resetBlock(controlEle, idx);// idx ignored; jslint pacifier
            });
            ctl.showInternationalize();

            //show all of the hidden application sections as one batch
            $('#main > div').removeClass(base.CONST.SLEEP_CONTROL);
        };// ./app.initialize(root)

        //Load the résumé data into application storage
        base.initialize(base);

        // Create common resources needed by display functions
        base.app.build(base);

        // Add the stored data to the active page
        base.bio.display(base.bio);
        base.work.display(base.work);
        base.projects.display(base.projects);
        base.education.display(base.education);

        base.showMap();
        base.app.initialize(base);//Setup the dynamic features
    }(baseForApp));// ./function(glbRoot)
});// ./function ()
/*
    TODO: added functionality
        - hover popups for detail expansion
        - skills groups with tooltip expansion
            - shell scripts: MS DOS, VAX/VMS DCL, bash, aRexx, amigaDos
            - basic: Vax Basic, AmigaBasic, ABasic, Visual Basic, VB.NET, VBA,
                MS Basic? C64?, Pet?
        - replace (some) template strings with html5 template tag
            - add wrapper and/or class and css for IE support
 */
