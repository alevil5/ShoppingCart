$ (function  () {	
	
	changeAspect();
	
	$('.item').dblclick(function () { 
		updateStock($(this), "resta");
			
	});

	$('#btn_clear').click(function () {
		clearAll();
	});
});

function addArticle (item) {
	cloneDiv(item);
	removeDiv(item);
	updateShoppingCart(item, 1);
}

function cloneDiv (item) {	
	var newId = "c_"+$(item).attr("id");
	$("#cart_items").append($(item).clone());
	$("#cart_items").children().last().attr("id", newId).addClass("icart");
	$("#cart_items div").children(".stock").hide();
	$("#cart_items, #cart_items div").children().not("a").css("cursor", "default");
}

function removeDiv (item) {
	$("#cart_items").children().last().prepend('<a href="" class="delete"></a>');
	$("#cart_items div").children(".delete").last().click(function () {
		$($(this).parent().last()).remove();
		updateShoppingCart(item, -1);
		updateStock(item, "suma");
		return false;
	});
}

function updateShoppingCart (item, operator) {
	var price = $(item).children('.price').html().replace(" €", "");
	$("#cprice").val(parseInt($("#cprice").val().replace(" €", "")) + parseInt(price*operator) +" €");
	$('#citem').val(parseInt($('#citem').val())+(operator*1));
}

function clearAll () {
	$('#citem').val('0');
	$('#cprice').val('0 €');
	$('#cart_items').empty();
	$(".stock").html("Stock 10");
}

function updateStock (item, operation) {
	var stock = parseInt(item.children(".stock").html().replace("Stock ",""));

	if (operation == "resta") {	
		if (stock > 0) {
			stock--;
			$(item).children(".stock").html('Stock '+stock);
			addArticle($(item));
		}
		if (stock == 0) {
			$(item).children(".stock").html('<del>Agotado</del>');
		};
	}else if (operation == "suma") {
		if (item.children(".stock").html() == "<del>Agotado</del>") {
			stock = 1;
			$(item).children(".stock").html("Stock "+stock);
			stock++;	
		}else {
			stock++;
			$(item).children(".stock").html("Stock "+stock);
		}
		
	};	
}

function changeAspect () {
	$('.item').css('background-color','#cecece');
	$('#cart_items').css('border','4px solid black');
	$('img').css('border','1px solid blue');
	$('.item > label').css('text-decoration','underline');
	$('#cart_container button').css('color','red');
	$('.item label + label').css('color','white');
	$('*:contains("€"), input').css('color', 'green');
	$('div:empty').css('background-color', 'yellow');
	$('.item:first, .item:last').css('background-color','red');
	$('img[src*="camiseta"]').css('border-color', 'green');
}
