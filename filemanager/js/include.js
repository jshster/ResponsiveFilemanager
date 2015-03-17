!function(e,t,a){"use strict";function i(){e("#textfile_create_area").parent().parent().remove();var t=e("#lang_filename").val()+': <input type="text" id="create_text_file_name" style="min-height:30px"><br><hr><textarea id="textfile_create_area" style="width:100%;height:150px;"></textarea>';bootbox.dialog(t,[{label:e("#cancel").val(),"class":"btn"},{label:e("#ok").val(),"class":"btn-inverse",callback:function(){var t=e("#create_text_file_name").val(),a=e("#textfile_create_area").val();if(null!==t){t=_(t);var i=e("#sub_folder").val()+e("#fldr_value").val()+t,n=e("#cur_dir_thumb").val()+t;e.ajax({type:"POST",url:"execute.php?action=create_file",data:{path:i,path_thumb:n,name:t,new_content:a}}).done(function(t){""!=t&&bootbox.alert(t,function(){setTimeout(function(){window.location.href=e("#refresh").attr("href")+"&"+(new Date).getTime()},500)})})}}}],{header:e("#lang_new_file").val()})}function n(t){e("#textfile_edit_area").parent().parent().remove();var a=t.find(".rename-file").attr("data-thumb"),i=t.find(".rename-file").attr("data-path");e.ajax({type:"POST",url:"ajax_calls.php?action=get_file&sub_action=edit&preview_mode=text",data:{path:i}}).done(function(n){bootbox.dialog(n,[{label:e("#cancel").val(),"class":"btn"},{label:e("#ok").val(),"class":"btn-inverse",callback:function(){var t=e("#textfile_edit_area").val();e.ajax({type:"POST",url:"execute.php?action=save_text_file",data:{path:i,path_thumb:a,new_content:t}}).done(function(e){""!=e&&bootbox.alert(e)})}}],{header:t.find(".name_download").val()})})}function o(){e.ajax({type:"POST",url:"ajax_calls.php?action=get_lang",data:{}}).done(function(t){bootbox.dialog(t,[{label:e("#cancel").val(),"class":"btn"},{label:e("#ok").val(),"class":"btn-inverse",callback:function(){var t=e("#new_lang_select").val();e.ajax({type:"POST",url:"ajax_calls.php?action=change_lang",data:{choosen_lang:t}}).done(function(t){""!=t?bootbox.alert(t):setTimeout(function(){window.location.href=e("#refresh").attr("href")+"&"+(new Date).getTime()},500)})}}],{header:e("#lang_lang_change").val()})})}function r(t){e("#files_permission_start").parent().parent().remove();var a,i;t.hasClass("directory")?(a=t.find(".rename-folder").attr("data-thumb"),i=t.find(".rename-folder").attr("data-path")):(a=t.find(".rename-file").attr("data-thumb"),i=t.find(".rename-file").attr("data-path")),e.ajax({type:"POST",url:"ajax_calls.php?action=chmod",data:{path:i,path_thumb:a}}).done(function(t){bootbox.dialog(t,[{label:e("#cancel").val(),"class":"btn"},{label:e("#ok").val(),"class":"btn-inverse",callback:function(){var t=e("#chmod_form #chmod_value").val();if(""!=t&&"undefined"!=typeof t){var n=e("#chmod_form input[name=apply_recursive]:checked").val();(""==n||"undefined"==typeof n)&&(n="none"),e.ajax({type:"POST",url:"execute.php?action=chmod",data:{path:i,path_thumb:a,new_mode:t,is_recursive:n}}).done(function(e){""!=e&&bootbox.alert(e)})}}}],{header:e("#lang_file_permission").val()})})}function l(t){var a=[];if(a.user=0,a.group=0,a.all=0,"undefined"!=typeof t&&1==t){var i=e("#chmod_form #chmod_value").val();a.user=i.substr(0,1),a.group=i.substr(1,1),a.all=i.substr(2,1),e.each(a,function(t){(""==a[t]||0==e.isNumeric(a[t])||parseInt(a[t])<0||parseInt(a[t])>7)&&(a[t]="0")}),e("#chmod_form input:checkbox").each(function(){var t=e(this).attr("data-group"),i=e(this).attr("data-value");c(a[t],i)?e(this).prop("checked",!0):e(this).prop("checked",!1)})}else e("#chmod_form input:checkbox:checked").each(function(){var t=e(this).attr("data-group"),i=e(this).attr("data-value");a[t]=parseInt(a[t])+parseInt(i)}),e("#chmod_form #chmod_value").val(a.user.toString()+a.group.toString()+a.all.toString())}function c(t,a){var i=[];return i[1]=[1,3,5,7],i[2]=[2,3,6,7],i[4]=[4,5,6,7],t=parseInt(t),a=parseInt(a),-1!=e.inArray(t,i[a])}function s(){bootbox.confirm(e("#lang_clear_clipboard_confirm").val(),e("#cancel").val(),e("#ok").val(),function(t){1==t&&e.ajax({type:"POST",url:"ajax_calls.php?action=clear_clipboard",data:{}}).done(function(t){""!=t?bootbox.alert(t):e("#clipboard").val("0"),p(!1)})})}function d(t,a){if("copy"==a||"cut"==a){var i,n;t.hasClass("directory")?(i=t.find(".rename-folder").attr("data-thumb"),n=t.find(".rename-folder").attr("data-path")):(i=t.find(".rename-file").attr("data-thumb"),n=t.find(".rename-file").attr("data-path")),e.ajax({type:"POST",url:"ajax_calls.php?action=copy_cut",data:{path:n,path_thumb:i,sub_action:a}}).done(function(t){""!=t?bootbox.alert(t):(e("#clipboard").val("1"),p(!0))})}}function u(t){bootbox.confirm(e("#lang_paste_confirm").val(),e("#cancel").val(),e("#ok").val(),function(a){if(1==a){var i,n;"undefined"!=typeof t?(i=t.find(".rename-folder").attr("data-path"),n=t.find(".rename-folder").attr("data-thumb")):(i=e("#sub_folder").val()+e("#fldr_value").val(),n=e("#cur_dir_thumb").val()),e.ajax({type:"POST",url:"execute.php?action=paste_clipboard",data:{path:i,path_thumb:n}}).done(function(t){""!=t?bootbox.alert(t):(e("#clipboard").val("0"),p(!1),setTimeout(function(){window.location.href=e("#refresh").attr("href")+"&"+(new Date).getTime()},300))})}})}function f(t,a){var i;i=t.find(t.hasClass("directory")?".rename-folder":".rename-file");var n=i.attr("data-thumb"),o=i.attr("data-path");t.parent().hide(100),e.ajax({type:"POST",url:"ajax_calls.php?action=copy_cut",data:{path:o,path_thumb:n,sub_action:"cut"}}).done(function(i){if(""!=i)bootbox.alert(i);else{var n,o;"undefined"!=typeof a?a.hasClass("back-directory")?(n=a.find(".path").val(),o=a.find(".path_thumb").val()):(n=a.find(".rename-folder").attr("data-path"),o=a.find(".rename-folder").attr("data-thumb")):(n=e("#sub_folder").val()+e("#fldr_value").val(),o=e("#cur_dir_thumb").val()),e.ajax({type:"POST",url:"execute.php?action=paste_clipboard",data:{path:n,path_thumb:o}}).done(function(a){""!=a?(bootbox.alert(a),t.parent().show(100)):(e("#clipboard").val("0"),p(!1),t.parent().remove())})}}).error(function(){t.parent().show(100)})}function p(t){1==t?e(".paste-here-btn, .clear-clipboard-btn").removeClass("disabled"):e(".paste-here-btn, .clear-clipboard-btn").addClass("disabled")}function h(a){var i=e(".breadcrumb").width()+a,n=e("#view"),o=e("#help");if(e(".uploader").css("width",i),n.val()>0){if(1==n.val())e("ul.grid li, ul.grid figure").css("width","100%");else{var r=Math.floor(i/380);0==r&&(r=1,e("h4").css("font-size",12)),i=Math.floor(i/r-3),e("ul.grid li, ul.grid figure").css("width",i)}o.hide()}else t.touch&&o.show()}function m(){var t=e(this);0==e("#view").val()&&(1==t.attr("toggle")?(t.attr("toggle",0),t.animate({top:"0px"},{queue:!1,duration:300})):(t.attr("toggle",1),t.animate({top:"-30px"},{queue:!1,duration:300})))}function v(e){for(var t=e.split("/"),a=3;a<t.length;a++)t[a]=encodeURIComponent(t[a]);return t.join("/")}function b(e){for(var e,t=[/[\300-\306]/g,/[\340-\346]/g,/[\310-\313]/g,/[\350-\353]/g,/[\314-\317]/g,/[\354-\357]/g,/[\322-\330]/g,/[\362-\370]/g,/[\331-\334]/g,/[\371-\374]/g,/[\321]/g,/[\361]/g,/[\307]/g,/[\347]/g],a=["A","a","E","e","I","i","O","o","U","u","N","n","C","c"],i=0;i<t.length;i++)e=e.replace(t[i],a[i]);return e}function _(t){return null!=t?("true"==e("#transliteration").val()&&(t=b(t),t=t.replace(/[^A-Za-z0-9\.\-\[\] _]+/g,"")),"true"==e("#convert_spaces").val()&&(t=t.replace(/ /g,e("#replace_with").val()),t=t.toLowerCase()),t=t.replace('"',""),t=t.replace("'",""),t=t.replace("/",""),t=t.replace("\\",""),t=t.replace(/<\/?[^>]+(>|$)/g,""),e.trim(t)):null}function g(t,a,i,n,o,r){null!==n&&(n=_(n),e.ajax({type:"POST",url:"execute.php?action="+t,data:{path:a,path_thumb:i,name:n.replace("/","")}}).done(function(e){return""!=e?(bootbox.alert(e),!1):(""!=r&&window[r](o,n),!0)}))}function x(t,a){var i=e("li.dir","ul.grid").filter(":visible"),n=e("li.file","ul.grid").filter(":visible"),o=[],r=[],l=[],c=[];i.each(function(){var t=e(this),i=t.find(a).val();if(e.isNumeric(i))for(i=parseFloat(i);"undefined"!=typeof o[i]&&o[i];)i=parseFloat(parseFloat(i)+parseFloat(.001));else i=i+"a"+t.find("h4 a").attr("data-file");o[i]=t.html(),r.push(i)}),n.each(function(){var t=e(this),i=t.find(a).val();if(console.log(i),e.isNumeric(i))for(i=parseFloat(i);"undefined"!=typeof l[i]&&l[i];)i=parseFloat(parseFloat(i)+parseFloat(.001));else i=i+"a"+t.find("h4 a").attr("data-file");l[i]=t.html(),c.push(i)}),console.log("----------------"),e.isNumeric(r[0])?r.sort(function(e,t){return parseFloat(e)-parseFloat(t)}):r.sort(),e.isNumeric(c[0])?c.sort(function(e,t){return parseFloat(e)-parseFloat(t)}):c.sort(),t&&(r.reverse(),c.reverse()),i.each(function(t){var a=e(this);a.html(o[r[t]])}),n.each(function(t){var a=e(this);a.html(l[c[t]])})}function w(e,t){return featherEditor.launch({image:e,url:t}),!1}function y(){e(window).trigger("scroll")}var k="9.9.0",C=!0,j=0,T=function(){var e=0;return function(t,a){clearTimeout(e),e=setTimeout(t,a)}}(),S={contextActions:{copy_url:function(t){var a=e("#base_url").val()+e("#cur_dir").val(),i=t.find("a.link").attr("data-file");""!=i&&null!=i&&(a+=i),i=t.find("h4 a.folder-link").attr("data-file"),""!=i&&null!=i&&(a+=i),bootbox.alert('URL:<br/><div class="input-append" style="width:100%"><input id="url_text'+j+'" type="text" style="width:80%; height:30px;" value="'+v(a)+'" /><button id="copy-button'+j+'" class="btn btn-inverse copy-button" style="width:20%; height:30px;" data-clipboard-target="url_text'+j+'" data-clipboard-text="Copy Me!" title="copy"></button></div>'),e("#copy-button"+j).html('<i class="icon icon-white icon-share"></i> '+e("#lang_copy").val());var n=new ZeroClipboard(e("#copy-button"+j));n.on("ready",function(){n.on("wrongFlash noFlash",function(){ZeroClipboard.destroy()}),n.on("aftercopy",function(){e("#copy-button"+j).html('<i class="icon icon-ok"></i> '+e("#ok").val()),e("#copy-button"+j).attr("class","btn disabled"),j++}),n.on("error",function(){})})},unzip:function(t){var a=e("#sub_folder").val()+e("#fldr_value").val()+t.find("a.link").attr("data-file");e.ajax({type:"POST",url:"ajax_calls.php?action=extract",data:{path:a}}).done(function(t){""!=t?bootbox.alert(t):window.location.href=e("#refresh").attr("href")+"&"+(new Date).getTime()})},edit_img:function(t){var a=t.attr("data-name"),i=e("#base_url_true").val()+e("#cur_dir").val()+a,n=e("#aviary_img");n.attr("data-name",a),n.attr("src",i).load(w(n.attr("id"),i))},duplicate:function(t){var a=t.find("h4").text().trim();bootbox.prompt(e("#lang_duplicate").val(),e("#cancel").val(),e("#ok").val(),function(e){if(null!==e&&(e=_(e),e!=a)){var i=t.find(".rename-file");g("duplicate_file",i.attr("data-path"),i.attr("data-thumb"),e,i,"apply_file_duplicate")}},a)},copy:function(e){d(e,"copy")},cut:function(e){d(e,"cut")},paste:function(){u()},chmod:function(e){r(e)},edit_text_file:function(e){n(e)}},makeContextMenu:function(){var t=this;e.contextMenu({selector:"figure:not(.back-directory), .list-view2 figure:not(.back-directory)",autoHide:!0,build:function(i){i.addClass("selected");var n={callback:function(e){t.contextActions[e](i)},items:{}};return(i.find(".img-precontainer-mini .filetype").hasClass("png")||i.find(".img-precontainer-mini .filetype").hasClass("jpg")||i.find(".img-precontainer-mini .filetype").hasClass("jpeg"))&&a&&(n.items.edit_img={name:e("#lang_edit_image").val(),icon:"edit_img",disabled:!1}),n.items.copy_url={name:e("#lang_show_url").val(),icon:"url",disabled:!1},(i.find(".img-precontainer-mini .filetype").hasClass("zip")||i.find(".img-precontainer-mini .filetype").hasClass("tar")||i.find(".img-precontainer-mini .filetype").hasClass("gz"))&&(n.items.unzip={name:e("#lang_extract").val(),icon:"extract",disabled:!1}),i.find(".img-precontainer-mini .filetype").hasClass("edit-text-file-allowed")&&(n.items.edit_text_file={name:e("#lang_edit_file").val(),icon:"edit",disabled:!1}),i.hasClass("directory")||1!=e("#duplicate").val()||(n.items.duplicate={name:e("#lang_duplicate").val(),icon:"duplicate",disabled:!1}),i.hasClass("directory")||1!=e("#copy_cut_files_allowed").val()?i.hasClass("directory")&&1==e("#copy_cut_dirs_allowed").val()&&(n.items.copy={name:e("#lang_copy").val(),icon:"copy",disabled:!1},n.items.cut={name:e("#lang_cut").val(),icon:"cut",disabled:!1}):(n.items.copy={name:e("#lang_copy").val(),icon:"copy",disabled:!1},n.items.cut={name:e("#lang_cut").val(),icon:"cut",disabled:!1}),0==e("#clipboard").val()||i.hasClass("directory")||(n.items.paste={name:e("#lang_paste_here").val(),icon:"clipboard-apply",disabled:!1}),i.hasClass("directory")||1!=e("#chmod_files_allowed").val()?i.hasClass("directory")&&1==e("#chmod_dirs_allowed").val()&&(n.items.chmod={name:e("#lang_file_permission").val(),icon:"key",disabled:!1}):n.items.chmod={name:e("#lang_file_permission").val(),icon:"key",disabled:!1},n.items.sep="----",n.items.info={name:"<strong>"+e("#lang_file_info").val()+"</strong>",disabled:!0},n.items.name={name:i.attr("data-name"),icon:"label",disabled:!0},"img"==i.attr("data-type")&&(n.items.dimension={name:i.find(".img-dimension").html(),icon:"dimension",disabled:!0}),n.items.size={name:i.find(".file-size").html(),icon:"size",disabled:!0},n.items.date={name:i.find(".file-date").html(),icon:"date",disabled:!0},n},events:{hide:function(){e("figure").removeClass("selected")}}}),e(document).on("contextmenu",function(t){return e(t.target).is("figure")?void 0:!1})},bindGridEvents:function(){function t(e){window[e.attr("data-function")](e.attr("data-file"),e.attr("data-field_id"))}var a=e("ul.grid");a.on("click",".modalAV",function(t){var a=e(this);t.preventDefault();var i=e("#previewAV"),n=e(".body-preview");i.removeData("modal"),i.modal({backdrop:"static",keyboard:!1}),a.hasClass("audio")?n.css("height","80px"):n.css("height","345px"),e.ajax({url:a.attr("data-url"),success:function(e){n.html(e)}})}),a.on("click",".file-preview-btn",function(t){var a=e(this);t.preventDefault(),e.ajax({url:a.attr("data-url"),success:function(e){bootbox.alert(e)}})}),a.on("click",".preview",function(){var t=e(this);return e("#full-img").attr("src",decodeURIComponent(t.attr("data-url"))),!0}),a.on("click",".rename-file",function(){var t=e(this),a=t.parent().parent().parent(),i=a.find("h4"),n=e.trim(i.text());bootbox.prompt(e("#rename").val(),e("#cancel").val(),e("#ok").val(),function(e){null!==e&&(e=_(e),e!=n&&g("rename_file",t.attr("data-path"),t.attr("data-thumb"),e,a,"apply_file_rename"))},n)}),a.on("click",".rename-folder",function(){var t=e(this),a=t.parent().parent().parent(),i=a.find("h4"),n=e.trim(i.text());bootbox.prompt(e("#rename").val(),e("#cancel").val(),e("#ok").val(),function(e){null!==e&&(e=_(e).replace(".",""),e!=n&&g("rename_folder",t.attr("data-path"),t.attr("data-thumb"),e,a,"apply_folder_rename"))},n)}),a.on("click",".delete-file",function(){var t=e(this);bootbox.confirm(t.attr("data-confirm"),e("#cancel").val(),e("#ok").val(),function(e){1==e&&(g("delete_file",t.attr("data-path"),t.attr("data-thumb"),"","",""),t.parent().parent().parent().parent().remove())})}),a.on("click",".delete-folder",function(){var t=e(this);bootbox.confirm(t.attr("data-confirm"),e("#cancel").val(),e("#ok").val(),function(e){1==e&&(g("delete_folder",t.attr("data-path"),t.attr("data-thumb"),"","",""),t.parent().parent().parent().remove())})}),e("ul.grid .link").on("click",function(){t(e(this))}),e("ul.grid div.box").on("click",function(){var a=e(this).find(".link");if(0!==a.length)t(a);else{var i=e(this).find(".folder-link");0!==i.length&&(document.location=e(i).prop("href"))}})},makeFilters:function(t){e("#filter-input").on("keyup",function(){e(".filters label").removeClass("btn-inverse"),e(".filters label").find("i").removeClass("icon-white"),e("#ff-item-type-all").addClass("btn-inverse"),e("#ff-item-type-all").find("i").addClass("icon-white");var a=_(e(this).val()).toLowerCase();e(this).val(a),t&&T(function(){e("li","ul.grid ").each(function(){var t=e(this);""!=a&&-1==t.attr("data-name").toLowerCase().indexOf(a)?t.hide(100):t.show(100)}),y(),e.ajax({url:"ajax_calls.php?action=filter&type="+a}).done(function(e){""!=e&&bootbox.alert(e)}),T(function(){var t=0!=e("#descending").val()?!0:!1;x(t,"."+e("#sort_by").val())},500)},300)}).keypress(function(t){13==t.which&&e("#filter").trigger("click")}),e("#filter").on("click",function(){var t=_(e("#filter-input").val());window.location.href=e("#current_url").val()+"&filter="+t})},makeUploader:function(){e("#uploader-btn").on("click",function(){var t=e("#sub_folder").val()+e("#fldr_value").val()+"/";t=t.substring(0,t.length-1),e("#iframe-container").html(e("<iframe />",{name:"JUpload",id:"uploader_frame",src:"uploader/index.php?path="+t,frameborder:0,width:"100%",height:360}))}),e(".upload-btn").on("click",function(){e(".uploader").show(500)}),e(".close-uploader").on("click",function(){e(".uploader").hide(500),setTimeout(function(){window.location.href=e("#refresh").attr("href")+"&"+(new Date).getTime()},420)})},makeSort:function(t){e("input[name=radio-sort]").on("click",function(){var i=e(this).attr("data-item"),n=e("#"+i),o=e(".filters label");o.removeClass("btn-inverse"),o.find("i").removeClass("icon-white"),e("#filter-input").val(""),n.addClass("btn-inverse"),n.find("i").addClass("icon-white"),"ff-item-type-all"==i?t?e(".grid li").show(300):window.location.href=e("#current_url").val()+"&sort_by="+e("#sort_by").val()+"&descending="+(a?1:0):e(this).is(":checked")&&(e(".grid li").not("."+i).hide(300),e(".grid li."+i).show(300)),y()});var a=e("#descending").val();e(".sorter").on("click",function(){var i=e(this);a=e("#sort_by").val()===i.attr("data-sort")?0==a?!0:!1:!0,t?(e.ajax({url:"ajax_calls.php?action=sort&sort_by="+i.attr("data-sort")+"&descending="+(a?1:0)}),x(a,"."+i.attr("data-sort")),e(" a.sorter").removeClass("descending").removeClass("ascending"),e(".sort-"+i.attr("data-sort")).addClass(a?"descending":"ascending"),e("#sort_by").val(i.attr("data-sort")),e("#descending").val(a?1:0),y()):window.location.href=e("#current_url").val()+"&sort_by="+i.attr("data-sort")+"&descending="+(a?1:0)})}};e(document).ready(function(){if(C&&S.makeContextMenu(),e("#full-img").on("click",function(){e("#previewLightbox").lightbox("hide")}),S.bindGridEvents(),parseInt(e("#file_number").val())>parseInt(e("#file_number_limit_js").val()))var a=!1;else var a=!0;if(S.makeSort(a),S.makeFilters(a),e("#info").on("click",function(){bootbox.alert('<div class="text-center"><br/><img src="img/logo.png" alt="responsive filemanager"/><br/><br/><p><strong>RESPONSIVE filemanager v.'+k+'</strong><br/><a href="http://www.responsivefilemanager.com">responsivefilemanager.com</a></p><br/><p>Copyright © <a href="http://www.tecrail.com" alt="tecrail">Tecrail</a> - Alberto Peripolli. All rights reserved.</p><br/><p>License<br/><small><img alt="Creative Commons License" style="border-width:0" src="http://responsivefilemanager.com/license.php" /><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/">Creative Commons Attribution-NonCommercial 3.0 Unported License</a>.</small></p></div>')}),e("#change_lang_btn").on("click",function(){o()}),S.makeUploader(),e("body").on("keypress",function(e){var t=String.fromCharCode(e.which);return"'"==t||'"'==t||"\\"==t||"/"==t?!1:void 0}),e(".create-file-btn").on("click",function(){i()}),e(".new-folder").on("click",function(){bootbox.prompt(e("#insert_folder_name").val(),e("#cancel").val(),e("#ok").val(),function(t){if(null!==t){t=_(t).replace(".","");var a=e("#sub_folder").val()+e("#fldr_value").val()+t,i=e("#cur_dir_thumb").val()+t;e.ajax({type:"POST",url:"execute.php?action=create_folder",data:{path:a,path_thumb:i}}).done(function(){setTimeout(function(){window.location.href=e("#refresh").attr("href")+"&"+(new Date).getTime()},300)})}},e("#new_folder").val())}),e(".view-controller button").on("click",function(){var t=e(this);e(".view-controller button").removeClass("btn-inverse"),e(".view-controller i").removeClass("icon-white"),t.addClass("btn-inverse"),t.find("i").addClass("icon-white"),e.ajax({url:"ajax_calls.php?action=view&type="+t.attr("data-value")}).done(function(e){""!=e&&bootbox.alert(e)}),"undefined"!=typeof e("ul.grid")[0]&&e("ul.grid")[0]&&(e("ul.grid")[0].className=e("ul.grid")[0].className.replace(/\blist-view.*?\b/g,"")),"undefined"!=typeof e(".sorter-container")[0]&&e(".sorter-container")[0]&&(e(".sorter-container")[0].className=e(".sorter-container")[0].className.replace(/\blist-view.*?\b/g,""));var a=t.attr("data-value");e("#view").val(a),e("ul.grid").addClass("list-view"+a),e(".sorter-container").addClass("list-view"+a),t.attr("data-value")>=1?h(14):(e("ul.grid li").css("width",126),e("ul.grid figure").css("width",122)),y()}),t.touch?(e("#help").show(),e(".box:not(.no-effect)").swipe({swipeLeft:m,swipeRight:m,threshold:30})):(e(".tip").tooltip({placement:"bottom"}),e(".tip-top").tooltip({placement:"top"}),e(".tip-left").tooltip({placement:"left"}),e(".tip-right").tooltip({placement:"right"}),e("body").addClass("no-touch")),e(".paste-here-btn").on("click",function(){0==e(this).hasClass("disabled")&&u()}),e(".clear-clipboard-btn").on("click",function(){0==e(this).hasClass("disabled")&&s()}),!t.csstransforms){var n=e("figure");n.on("mouseover",function(){0==e("#view").val()&&e("#main-item-container").hasClass("no-effect-slide")===!1&&e(this).find(".box:not(.no-effect)").animate({top:"-26px"},{queue:!1,duration:300})}),n.on("mouseout",function(){0==e("#view").val()&&e(this).find(".box:not(.no-effect)").animate({top:"0px"},{queue:!1,duration:300})})}e(window).resize(function(){h(28)}),h(14),p(1==e("#clipboard").val()?!0:!1),e("li.dir, li.file").draggable({distance:20,cursor:"move",helper:function(){e(this).find("figure").find(".box").css("top","0px");var t=e(this).clone().css("z-index",1e3).find(".box").css("box-shadow","none").css("-webkit-box-shadow","none").parent().parent();return e(this).addClass("selected"),t},start:function(){0==e("#view").val()&&e("#main-item-container").addClass("no-effect-slide")},stop:function(){e(this).removeClass("selected"),0==e("#view").val()&&e("#main-item-container").removeClass("no-effect-slide")}}),e("li.dir,li.back").droppable({accept:"ul.grid li",activeClass:"ui-state-highlight",hoverClass:"ui-state-hover",drop:function(t,a){f(a.draggable.find("figure"),e(this).find("figure"))}}),e(document).on("keyup","#chmod_form #chmod_value",function(){l(!0)}),e(document).on("focusout","#chmod_form #chmod_value",function(){var t=e("#chmod_form #chmod_value");null==t.val().match(/^[0-7]{3}$/)&&(t.val(t.attr("data-def-value")),l(!0))})})}(jQuery,Modernizr,image_editor);