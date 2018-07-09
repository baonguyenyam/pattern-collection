function getUIMG() {
	$.get("/getimg", function (data) {
		$('#pagination-container').pagination({
			dataSource: data,
			pageSize: 8,
			className: 'paginationjs-theme-green',
			callback: function (data, pagination) {
				var html = simpleTemplating(data);
				$('#data-container').html(html);
				IMGResponsive()
			}
		})
	})
}

function simpleTemplating(data) {
	var html = '<div class="row">';
	$.each(data, function (index, item) {
		html += '<div class="boxcol" onclick="openPreview(this)"><div class="item box" bg-img="/img/' + item + '" bg-size="auto" bg-pos="top left"></div></div>';
	});
	html += '</div>';
	return html;
}

function openPreview(e) { 
	$('#download').show()
	var um = $(e).find('.item').attr('bg-img')
	$('.preview .box').css({
		"background-position": "top left",
		"background-size": "auto",
		"background-image": "url(" + um + ")"
	})
	$('#download').attr('data-down', um)
 }


$(document).ready(function () {
	getUIMG()
	$('#download').on('click', function(){
		var x=new XMLHttpRequest();
		var u = $(this).attr('data-down')
		x.open("GET", u, true);
		x.responseType = 'blob';
		x.onload=function(e){download(x.response, u, "image/*" ); }
		x.send();
	})
});

function IMGResponsive() {
	// Set BG Resposive
	$('[bg-img]').each(function () {
		var bgimg = $(this).attr('bg-img');
		var pos = $(this).attr('bg-pos');
		var size = $(this).attr('bg-size');
		if (pos && pos.length > 0) {
			$(this).css({
				"background-position": pos
			});
		} else {
			$(this).css({
				"background-position": "center center"
			});
		}
		if (size && size.length > 0) {
			$(this).css({
				"background-size": size
			});
		} else {
			$(this).css({
				"background-size": "cover"
			});
		}
		$(this).css({
			"background-image": "url(" + bgimg + ")"
		});
	});
}