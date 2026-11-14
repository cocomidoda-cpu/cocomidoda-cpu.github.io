window.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CustomEase);
CustomEase.create("sec13_title", "M0,0 C0.11,0.494 0.174,0.574 0.3,0.7 0.306,0.706 0.293,0.693 0.3,0.7 0.42,0.828 0.528,1 1,1  ");
  var $data = $('.Quick_data')
  var _blank = 0;
  var scroll_Num = 18000;
  var time = 1000;
  $($data).text(scroll_Num)
  $('.Quick').click(function () {
    container.scrollTo(_blank, scroll_Num, time, )
    $('.Quick').addClass('on')
    setTimeout(function () {
      $('.Quick').removeClass('on')
    }, 1500);
  })


  let currentNumber = 0;
  let interval;
function updateCounter() {
  $('.intro_num').text(currentNumber + "%");
  // $('.intro_num02').text(currentNumber + "%");

  if(currentNumber >52){
    $('.intro_num').addClass('on')
    // $('.intro_num02').css({ width: currentNumber + '%' });
  }

  if (currentNumber === 100) {
      clearInterval(interval);
      $('.intro').addClass('on');
      setTimeout(function () {
          $('.intro').css({ display: "none" })
      }, 3500);
  } else {
      currentNumber += 10; 
      $('.intro_bg').css({ width: currentNumber + '%' });
  }
}

  // 카운터 속도 
  interval = setInterval(updateCounter, 220);



$('.sec01_img01').addClass('on')
$('.sec01_img02 >img').addClass('on')
$('.sec01_img03 >img').addClass('on')
$('.sec01_img04 >img').addClass('on')
$('.sec01_img05 >img').addClass('on')


$('.sec03_img04').click(function(){
  container.scrollTo(0, 10375, 3000, )
  $('.sec03_con').addClass('on')
setTimeout(function(){
  $('.sec03_con').removeClass('on')
},200)
})



  gsap.to("#sec02", {
    scrollTrigger:
     {trigger: "#sec02",
     start: "top top",
     end:'7000 bottom',
     pin:true,
     scrub:true,
    },
  })


  gsap.to(".sec02_con02", {
    scrollTrigger:
     {trigger: ".sec02_con02",
     start: "top top",
     end:'6000 bottom',
     pin:false,
     scrub:2,
    },
    y:-1040
  })

  gsap.to(".sec02_typo_01", {
    scrollTrigger:
     {trigger: ".sec02_con02",
     start: "3500 top",
     end:'7000 bottom',
     pin:false,
     scrub:2,
    },
    y:-100

  })

  gsap.from(".sec02_img_01", {
    scrollTrigger:
     {trigger: ".sec02_con02",
     start: "3500 top",
     end:'7000 bottom',
     pin:false,
     scrub:2,
    },
    y:-50

  })


  gsap.to(".sec02_text_01", {
    scrollTrigger:
     {trigger: ".sec02_con02",
     start: "5000 top",
     end:'8000 bottom',
     pin:false,
     scrub:2,
    },
    y:-150

  })

  // gsap.to("#sec02", {
  //   scrollTrigger:
  //    {trigger: "#sec02",
  //    start: "top top",
  //   //  end:'12000 bottom',
  //    end:'2000 bottom',
  //    pin:true,
  //    markers:true,
  //    scrub:true,
  //   },
  // })



  // gsap.to("#sec03", {
  //   scrollTrigger:
  //    {trigger: "#sec03",
  //    start: "top top",
  //    end:'4000 bottom',
  //    pin:true,
  //    markers:true,
  //    scrub:true,
  //   },
  // })


  gsap.from(".sec03_img01 >img", {
    scrollTrigger:
     {trigger: "#sec03",
     start: "-500 top",
     end:'300 bottom',
     pin:false,
     scrub:2
     ,
    },
    scale:0.2,
    opacity:0.2

  })


  gsap.from(".sec03_img02 >img", {
    scrollTrigger:
     {trigger: ".sec03_img01",
     start: "-350 top",
     end:'1000 5000',
     pin:false,
     scrub:false,
     toggleActions:"restart none reverse none"
    },
    opacity:0
  })



  gsap.to("#sec04", {
    scrollTrigger:
     {trigger: "#sec04",
     start: "top top",
    //  end:'12000 bottom',
     end:'8000 bottom',
     pin:true,
     scrub:true,
    },
  })

  gsap.to(".sec04_list", {
    scrollTrigger:
     {trigger: ".sec04_list",
     start: "top top",
     end:'8000 bottom',
     pin:false,
     scrub:1,
    },
    x:"-2596.04px"

  })

  $('.sec04_list >li').hover(function(){
    $('.sec04_list > li').removeClass('on')
     $(this).addClass('on')
   })
  

  gsap.to("#sec05", {
    scrollTrigger:
     {trigger:  "#sec05",
     start: "top top",
     end:'4000 bottom',
     pin:true,
     scrub:true,
    },
  })


  gsap.from(".sec05_img02 >li", {
    scrollTrigger:
     {trigger:  "#sec05",
     start: "top top",
     end:'2500 bottom',
     pin:false,
     scrub:true,
    },
    y:300,
    stagger:0.2,
    opacity:0,
    // scale:0.9

  })



  gsap.to(".sec05_con", {
    scrollTrigger:
     {trigger:  ".sec05_con",
     start: "3000 top",
     end:'7000 bottom',
     pin:false,
     scrub:true,
    },
    opacity:0,
  })


  $('.sec06_img >div').hover(function(e){
    var rotate_list = $(this).index()
     // 마우스를 지정한 엘리먼트 위로 가져다 올렸을 때 실행코드
     $(this).find('.sec06_imgwrap').addClass('hoverEffect');
   },function(e){
     // 마우스를 지정한 엘리먼트 밖으로 빠졌을 때 실행코드
     $(this).find('.sec06_imgwrap').removeClass('hoverEffect');
   }),function(e){
     // 마우스를 지정한 엘리먼트 밖으로 빠졌을 때 실행코드
     // $(this).find('img').removeClass('hoverEffect');
   }
  
  gsap.from(".matcha_list >li", {
    scrollTrigger:
     {trigger: ".sec07_con",
     start: "-800 top",
     end:'900 bottom',
     pin:false,
     scrub:true,
    },
    // x:500,
    y:-900,
    stagger:0.05,
    opacity:0,
    // rotate:10,
    // ease: "steps(100)",
    // ease: "power4.in",
    ease: "slow(0.7,0.7,false)",
  })

  gsap.to(".sec07_text_03", {
    scrollTrigger:
     {trigger: ".sec07_con",
     start: "top top",
     end:'13000 bottom',
     pin:false,
     scrub:2,
    },
    y:300

  })

/*sec08*/

  gsap.to("#sec08", {
    scrollTrigger:
     {trigger:  "#sec08",
     start: "top top",
     end:'12000 bottom',
     pin:true,
     scrub:true,
    },
  })

  gsap.to(".sec08_list", {
    scrollTrigger:
     {trigger: ".sec08_list",
     start: "300 top",
     end:'8000 bottom',
     pin:false,
     scrub:2,
    },
    x:"-3165px"
  })



  gsap.to(".sec08_list", {
    scrollTrigger:
     {trigger: ".sec08_list",
     start: "top top",
     end:'2000 bottom',
     pin:false,
     scrub:2,
    },
    backgroundColor:"white"

  })

  gsap.to(".sec08_typo", {
    scrollTrigger:
     {trigger: ".sec08_img01",
     start: "2500 top",
     end:'4000 bottom',
     pin:false,
     scrub:2,
    },
    x:-200
  })


  gsap.from(".sec08_img01", {
    scrollTrigger:
     {trigger: ".sec08_img01",
     start: "2500 top",
     end:'6000 bottom',
     pin:false,
     scrub:1,
    },
    scale:0.8
  })


/*타이밍이 이상함*/
  gsap.from(".sec08_img02>li", {
    scrollTrigger:
     {trigger:  ".sec08_img01",
     start: "6500 top",
     end:'9000 bottom',
     pin:false,
     scrub:true,
    },
    y:300,
    stagger:0.2,
    opacity:0,
  })

/*sec09*/

  gsap.from(".sec09_title_01", {
    scrollTrigger:
     {trigger: ".sec09_title_01",
     start: "-700 top",
     end:'700 bottom',
     pin:false,
     scrub:true,
    },
    ease: "steps(100)",
    x:-1000
  })

  
  gsap.from(".sec09_title_02", {
    scrollTrigger:
     {trigger: ".sec09_title_01",
     start: "-700 top",
     end:'700 bottom',
     pin:false,
     scrub:true,
    },
    ease: "steps(100)",
    x:1000
  })





$('.store_list >li').hover(function(){
var i = $(this).index()
// 뒤에 배경색상 차는 구동
$(this).find('.point_color').addClass('on')
  // ex:첫번째 리스트에 마우스를 올렸다 
  // ==> this ==> 첫번째 li// 첫번째 li 에서 class 이름이 point_color 를 찾아서 on클래스를 적용


$('.sec09_img_con >div').eq(i).addClass('on')
$('.store_list >li').eq(i).find('p').addClass('on')
$('.store_list >li').eq(i).find('.store_info > p').addClass('on')


  console.log(i)

},function(){
    $('.point_color').removeClass('on')
    $('.sec09_img_con >div').removeClass('on')

    $('.store_list >li>p').removeClass('on')
    $('.store_list >li>div >p').removeClass('on')

    

})



  gsap.to(".sec10_text_01", {
    scrollTrigger:
     {trigger: "#sec10",
     start: "500 top",
     end:'2500 bottom',
     pin:false,
     scrub:2,
    },
    x:-500
  })


  gsap.from(".sec11_bg", {
    scrollTrigger:
     {trigger: "#sec11",
     start: "-500 top",
     end:'2000 bottom',
     pin:false,
     scrub:2,
    },
    opacity:0
  })

  gsap.from(".sec10_text_02", {
    scrollTrigger:
     {trigger: "#sec10",
     start: "500 top",
     end:'2500 bottom',
     pin:false,
     scrub:2,
    },
    x:-500
  })

  gsap.from(".sec12_img_01", {
    scrollTrigger:
     {trigger: ".sec12_con",
    //  start: "3500 top",
     end:'3000 bottom',
     pin:false,
     scrub:2,
    },
    y:-100

  })

  gsap.from(".sec12_img_01_text", {
    scrollTrigger:
     {trigger: ".sec12_con",
    //  start: "3500 top",
     end:'3000 bottom',
     pin:false,
     scrub:2,
    },
    y:-30

  })

  gsap.to(".sec12_text", {
    scrollTrigger:
     {trigger: ".sec12_con",
    //  start: "3500 top",
     end:'3000 bottom',
     pin:false,
     scrub:2,
    },
    y:-100

  })

  $('.sec12_img_02').hover(function(){
    $('.sec12_img_02 > img').addClass('on')

   },function(){
    $('.sec12_img_02 > img').removeClass('on')

   })



   $('.sec12_img_01').hover(function(){
    $('.sec12_img_01 > img').addClass('on')

   },function(){
    $('.sec12_img_01 > img').removeClass('on')

   })

   gsap.from(".sec13_title >li", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "-300 top",
     end:'bottom bottom',
     pin:false,
     scrub:false,
    toggleActions:"restart none reverse none"
    },
    y:300,
    stagger:0.1,
    // ease:"power4.out",
  //  ease:" sec13_title",
  ease: "slow(0.7,0.7,false)",
    duration:1.1
  })
 

  /* scroll event section */
  // $(window).scroll(function () {
  //   var scrollTop = $(window).scrollTop();
  //   $(".posNum").text(scrollTop);
  container.addListener((e) => {
    let scrollTop = container.scrollTop;
    $(".posNum").html(scrollTop);



    if(scrollTop> 18500){
      $('.sec05_line >li:nth-child(1)').addClass('on')
      

    }else{
      $('.sec05_line >li:nth-child(1)').removeClass('on')

    }

    
    if(scrollTop> 18860){
      $('.sec05_line >li:nth-child(2)').addClass('on')
      

    }else{
      $('.sec05_line >li:nth-child(2)').removeClass('on')

    }

    if(scrollTop> 19120){
      $('.sec05_line >li:nth-child(3)').addClass('on')
      

    }else{
      $('.sec05_line >li:nth-child(3)').removeClass('on')

    }


    if(scrollTop> 33590){
      $('.sec08_line >li:nth-child(1)').addClass('on')
      
  
    }else{
      $('.sec08_line >li:nth-child(1)').removeClass('on')
  
    }
  
    
    if(scrollTop> 33950){
      $('.sec08_line >li:nth-child(2)').addClass('on')
      
  
    }else{
      $('.sec08_line >li:nth-child(2)').removeClass('on')
  
    }
  
    if(scrollTop> 34310){
      $('.sec08_line >li:nth-child(3)').addClass('on')
      
  
    }else{
      $('.sec08_line >li:nth-child(3)').removeClass('on')
  
    }


    
    // if(scrollTop> 19791){
    //   $('.sec05_line >li:nth-child(1)').addClass('on')
    // }else{
    //   $('.sec05_line >li:nth-child(1)').removeClass('on')

    // }

    if( scrollTop >43000){
      $('.sec13_img_01, .sec13_img_02, .sec13_img_03,.sec13_img_04').css({display:'block'})
      $('.sec13_img_01, .sec13_img_02, .sec13_img_03, .sec13_img_04').ripples({
        // 부드러움의 정도 //높으면 더 부드러움
        resolution: 220,
        // 파동 크기
        dropRadius: 50,
        // 굴곡의 정도 높으면 더 흐물흐물 거림
        perturbance: 0.06,
      });
    }else{
      $('.sec13_img_01, .sec13_img_02, .sec13_img_03, .sec13_img_04').css({display:'none'})
      $('.sec13_img_01, .sec13_img_02, .sec13_img_03, .sec13_img_04').ripples('destroy');
    }

    if(scrollTop> 44000){
      $('.footer_text_01, .footer_text_02').addClass('on')
    }else{
      $('.footer_text_01, .footer_text_02').removeClass('on')
    }



  });
})







// function toggleClassAndScroll(start, end, className) {
//   if (scrollTop >= start && scrollTop < end) {
//     $(className).addClass('on');
//   } else {
//     $(className).removeClass('on');
//   }
// }
// toggleClassAndScroll(100, 200, '#');
// toggleClassAndScroll(300, 400, '.');
// toggleClassAndScroll(500, 600, '#');
// toggleClassAndScroll(700, 800, '.');