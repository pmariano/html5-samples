var root_path = window.localStorage['root_path'] || 'videos';

$(document).ready(function(){
	buscaVideos();
	$('#rootPath').val(root_path);
});

errorCallback = function(tx,e){
	$('#message').html('Erro: ' + e.message);
}

function salvaRootPath(el){
	window.localStorage['root_path'] = el.value;
}

function criaTabela() {
	var db = open();
	db.transaction(function(tx) {
	  tx.executeSql("create table video(id integer not null primary key autoincrement, nome, path)", [], function(tx,result){
			$('#message').html('TABELA CRIADA COM SUCESSO');
		}, errorCallback);
	});
}

function dropaTabela() {
	var db = open();
	
	db.transaction(function(tx) {
	  tx.executeSql("drop table video", [], function(tx, result){
		console.log(result)
			$('#message').html('TABELA EXCLUIDA COM SUCESSO');
		}, errorCallback);
	});
}

function adicionaVideo() {
 	var path = $('#path').val();
 	var nome = $('#nome').val();

	var db = open();
	db.transaction(function(tx) {
	  tx.executeSql("insert into video(nome, path) values(?,?)", [nome, path], function(tx, result){
			$('#message').html('VALOR INSERIDO COM SUCESSO');
			buscaVideos();
		}, errorCallback);
	});
}

function excluirVideo(id) {
	var db = open();
	db.transaction(function(tx) {
	  tx.executeSql("delete from video where id = ?", [id], function(tx, result){
			$('#message').html('VALOR DELETADO COM SUCESSO');
			buscaVideos();
		}, errorCallback);
	});
}

function buscaVideos(){
	var db = open();
	db.transaction(function(tx) {
		tx.executeSql("select id, nome, path from video",[], function(tx, result) {
				var html = '';
				for(var i = 0; i < result.rows.length; i++){
						var row = result.rows.item(i);
						var id = row['id'];
						var nome = row['nome'];
						var path = row['path'];
					html += criaTagDeVideo(nome, id, path)
				}
				
				if(result.rows.length == 0){
					html ='N&atilde;o foi encontrado nenhum registro';
				}
				$('#videos').html(html);
			},errorCallback);
		});
}
function buscaVideoPorNome(){
	var nome = $('#nomeBusca').val();
	
	var db = open();
	db.transaction(function(tx) {
			tx.executeSql('SELECT id, nome, path from video where nome like "%' +nome+ '%"',[], function(tx, result) {
				var html = '';
				for (var i = 0; i < result.rows.length; i++){
						var row = result.rows.item(i);
						var id = row['id'];
						var nome = row['nome'];
						var path = row['path'];
						html += criaTagDeVideo(nome, id, path)
				}
				if(result.rows.length == 0){
					html ='N&atilde;o foi encontrado nenhum registro';
				}
				$('#videos').html(html);
			},errorCallback);
		});
}

function criaTagDeVideo(nome, id, path){
	return '<div style="float:left; margin-left:10px;"><h3>'+ nome +'<a style="padding-left:40px;"href="#" onclick="excluirVideo('+id+')">X</a></h3><br/><video src="'+root_path + '/'+ path+'" controls width="300" height="300"/></div>'
}


function open(){
  return window.openDatabase("testeDatabase", "1.0", "Aplicação para testar html database", 200000);
}