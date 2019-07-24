'use strict';

/* get imgs and display on page
gets files from json using $.get()

create an object that has genearlly the below props

image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
      "title": "UniWhal",
      "description": "A unicorn and a narwhal nuzzling their horns",
      "keyword": "narwhal",
      "horns": 1
*/

let fileName = "../page-1.json";

function HornyBeasts (hornyBeast){
  this.image_url = hornyBeast.image_url;
  this.title = hornyBeast.title;
  this.description = hornyBeast.description;
  this.keyword = hornyBeast.keyword;
  this.horns = hornyBeast.horns;
}
HornyBeasts.allHornyBeasts = [];
HornyBeasts.optionsArry =[];

HornyBeasts.prototype.render = function() {
  // $('main').append('<section class="clone"></section>');
  // let hornyBeastClone = $('section[class="clone"]');

  // let hornyBeastHtml = $('#handlebarsTemp').html();

  // hornyBeastClone.html(hornyBeastHtml);

  // hornyBeastClone.find('h2').text(this.title);
  // hornyBeastClone.find('img').attr('src', this.image_url).attr('alt', 'alt text');
  // hornyBeastClone.find('p').text(this.description);
  // hornyBeastClone.removeClass('clone');
  // hornyBeastClone.addClass('picSection');
  // hornyBeastClone.attr('id',this.keyword);

  let template = $('#handlebarsTemp').html();
  let templateRender = Handlebars.compile(template);
  console.log(templateRender);
  console.log(this);

  if(HornyBeasts.optionsArry.includes(this.keyword)){
    console.log('im already alive');
  }else{HornyBeasts.optionsArry.push(this.keyword);
    $('select').append(`<option value=${this.keyword}>${this.keyword}</option>`)
  }
  return templateRender(this);

}


HornyBeasts.readJson = (page) => {
  console.log(HornyBeasts.allHornyBeasts);

  $.get(page,'json')
    .then(data => {
      console.log(data);
      data.forEach(item => {
        HornyBeasts.allHornyBeasts.push( new HornyBeasts(item))
      });
    })
    //render to the dom
    .then(HornyBeasts.loadHornyBeasts);
};

HornyBeasts.loadHornyBeasts = () => {
  HornyBeasts.allHornyBeasts.forEach(hornyBeast => $('#hornyBeast-template').append(hornyBeast.render()));
};




//for Loop
$(() => HornyBeasts.readJson(fileName));

// $('select').on('change', function(){
//   let $selection = $(this).val();
//   $('section').hide();
//   $(`section[id ="${$selection}"]`).show();
//   console.log($(`section[id ="${$selection}"]`).show();)
//   console.log($selection)
//   console.log( typeof $selection)
// });

$('select').on('change', function(){
  let $selection = $(this).val();
  $('section').hide();
  $(`section[class ="section.${$selection}"]`).show();
  // console.log($(`section[class ="${$selection}"]`)[0].className);
  console.log($(`section[class ="section.${$selection}"]`));
  console.log($selection)
  // console.log( typeof $selection)
});
// $('#page2').on('click', function(){
// }
