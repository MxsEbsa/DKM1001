var trilha_sonora = new Howl({  urls: ['media/audio/musica.mp3','media/audio/musica.ogg'], onend: function() {trilha_sonora.play()}, volume: 0.2});
var text1 = new Howl({  urls: ['media/audio/texto1.mp3','media/audio/texto1.ogg']});
var acerto = new Howl({  urls: ['media/audio/acerto.mp3','media/audio/acerto.ogg']});
var erro = new Howl({  urls: ['media/audio/erro.mp3','media/audio/erro.ogg']});
var text2 = new Howl({  urls: ['media/audio/texto2.mp3','media/audio/texto2.ogg']});
var text3 = new Howl({  urls: ['media/audio/texto3.mp3','media/audio/texto3.ogg']});
var hover = new Howl({  urls: ['media/audio/hover.mp3','media/audio/hover.ogg']});
var hover_push = new Howl({  urls: ['media/audio/hover_push.mp3','media/audio/hover_push.ogg']});
var toc = new Howl({  urls: ['media/audio/toc.mp3','media/audio/toc.ogg']});

'use strict';

var startGame = {

  popup: function(){
    var popup = $('.popup')
      , content = popup.children('.content')
      , close = content.children('.close');

    popup.fadeIn(1000, function(){
      content.show().addAnimateClass('magictime puffIn');
      text1.stop().play();
      setTimeout(function(){
        close.show().addAnimateClass('bounceIn animated', function(){
          $('.noClick').hide();
        });
        close.off('click').on('click', function(){
          text1.stop();
          toc.stop().play();
          content.addAnimateClass('magictime puffOut', true);
          close.addAnimateClass('bounceOut animated', true);
          popup.fadeOut(1000);
        });
      }, 500);
    });
  },

  AnimaPersonagens: function(){
    var personagens = $('.drop')
      , animIn = [
        'bounceInUp animated',
        'bounceInDown animated',
        'bounceInLeft animated',
        'bounceInRight animated',
        'bounceInUp animated',
        'bounceInDown animated',
        'bounceInLeft animated',
        'bounceInRight animated',
        'bounceInUp animated',
        'bounceInDown animated',
        'bounceInLeft animated',
        'bounceInRight animated',
        'bounceInUp animated',
        'bounceInDown animated',
        'bounceInLeft animated',
        'bounceInRight animated',
        'bounceInUp animated',
        'bounceInDown animated',
        'bounceInLeft animated',
        'bounceInRight animated',
        'bounceInUp animated',
        'bounceInDown animated',
        'bounceInLeft animated',
        'bounceInRight animated'
      ];

    // personagens.
    animIn.forEach(function(classe, index){
      for(var i = 0; i < personagens.length; i++){
        personagens.show().eq(i).addAnimateClass(animIn[i]);
      }
    });

    setTimeout(function(){
      startGame.popup();
    }, 500);
  },

  initDragsAnimation: function(){
    var drags = $('.drag');

    drags.each(function(i) {
      var $self = $(this);
      setTimeout(function() {
        $self.show().addAnimateClass('bounceIn animated');
      }, i*100);
    });

    hover_push.stop().play();
  },

  feedback: function(fase, drags){
    var popup = $('.feedback')
      , salvaVidas = popup.children('.salvaVidasGame')
      , balaoFala = salvaVidas.children('.parabens')
      , btnAvancar = salvaVidas.children('.avancarGame').children('a');

    if($(fase).attr('class') == 'tela7'){
      balaoFala.children('p').css('font-size','17px').html('PARABÉNS! VOCÊ COMPLETOU TODOS OS DESAFIOS.');
      btnAvancar.hide();
      popup.show();
      salvaVidas.show().addAnimateClass('bounceInDown animated');
      setTimeout(function(){
        text3.stop().play();
        balaoFala.show().addAnimateClass('bounceInRight animated', function(){
          setTimeout(function(){
            window.parent.location.href = '../index.html';
          }, 5000);
        });
      }, 500);
    }else{
      function btnFechar(){
        $('.noClick').hide();
        btnAvancar.off('click').on('click', function(){
          $('.noClick').show();
          toc.stop().play();
          text2.stop();
          hover_push.stop().play();
          balaoFala.addAnimateClass('bounceOutUp animated', true);
          setTimeout(function(){
            salvaVidas.addAnimateClass('bounceOutLeft animated', true);
            popup.fadeOut(1000);
            setTimeout(function(){
              hover_push.stop().play();
              drags.hide();
              fase.hide();
              fase.next().fadeIn(1000);
              startGame.initDragsAnimation();
              startGame.AnimaPersonagens();
            }, 200);
          }, 500);
        });
      };

      hover_push.stop().play();
      popup.show();
      salvaVidas.show().addAnimateClass('bounceInDown animated');
      setTimeout(function(){
        text2.stop().play();
        hover_push.stop().play();
        balaoFala.show().addAnimateClass('bounceInRight animated', function(){
          btnFechar();
        });
      }, 500);
    }
  },

  dragAndDrop: function(){
    var drags = $('.drag')
      , drops = $('.drop')
      , fase;

    startGame.AnimaPersonagens();
    startGame.initDragsAnimation();

    drags.one('mousedown', function(){
      fase = $(this).parent().parent();
    });

    drags.draggable({revert: true, containment: ".game"});

    function verifica(){
      var qtdade = fase.children('ul.botoes').children('li').length;
      if(qtdade == 0){
        $('.noClick').show();
        startGame.feedback(fase, drags);
      }
    };

    drops.off('droppable').droppable({
      drop: function(event, ui){
        if($(event.target).attr('data-resposta') == $(ui.helper).attr('data-resposta')){
          $(this).droppable("disable");
          $(ui.helper).remove();
          verifica();
          acerto.stop().play();
          // Insere animações nas imagens do jogo
          if($(this).hasClass('prancha')){
            $(this).addClass('efectAcertPrancha');
          }else if($(this).hasClass('homemSurfando')){
            $(this).addClass('efectAcertHuman');
          }else if($(this).hasClass('coqueiroComprido')){
            $(this).attr('src','img/compridoAnim.gif');
          }else if($(this).hasClass('coqueiroCurto')){
            $(this).attr('src','img/curtoAnim.gif');
          }else if($(this).hasClass('salvaVidasEmCima')){
            $(this).attr('src','img/emCimaBrilho.gif');
          }else if($(this).hasClass('salvaVidasEmBaixo')){
            $(this).attr('src','img/emBaixoBrilho.gif');
          }else if($(this).hasClass('criancaDireita')){
            $(this).attr('src','img/crianca_direitaBrilho.gif');
          }else if($(this).hasClass('criancaEsquerda')){
            $(this).attr('src','img/crianca_esquerdaBrilho.gif');
          }else if($(this).hasClass('bandeiraFina')){
            $(this).addClass('efectAcertHuman');
          }else if($(this).hasClass('bandeiraGrosso')){
            $(this).addClass('efectAcertHuman');
          }else if($(this).hasClass('carrinho')){
            $(this).addClass('efectAcertPrancha');
          }else if($(this).hasClass('casteloEsquerdo')){
            $(this).attr('src','img/castelo_esquerdoBrilho.gif');
          }else if($(this).hasClass('casteloDireito')){
            $(this).attr('src','img/castelo_direitaBrilho.gif');
          }
        }
      }
    });
  },

	// SEU CÓDIGO JAVASCRIPT AQUI
	init: function(){
    setTimeout(function(){
      trilha_sonora.play();
      startGame.dragAndDrop();
    }, 1000);
	}
};

// startGame.init();

	function iniciar_com_tap(){
      //trilha_sonora.stop();
      trilha_sonora.play();
      startGame.dragAndDrop();
	
	clearInterval(verificar_inicio_cnd);
	}


