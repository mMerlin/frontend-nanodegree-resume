var placeholderText = '%data%'; //common search string
var me = {};//empty object; reduce namespace pollution
me.name = 'H. Phil Duby';
me.role = 'Web Developer';
//resumeHTML = {};
//ResumeHTML.headerName = '{stuff}%data%{stuff}';
//var formatedResume = {};
//formatedResume.Name = ResumeHTML.header.name.replace(placeholderText, me.name);
var formattedName = HTMLheaderName.replace(placeholderText, me.name);
var formattedRole = HTMLheaderRole.replace(placeholderText, me.role);

$('#header').prepend(formattedRole);
$('#header').prepend(formattedName);
