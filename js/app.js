'use strict';

let fileName = '../page-1.json';


//sorts the array based on title
const sortBeastsTitle = (arr) => arr.sort((a,b) => a.title.localeCompare(b.title));




//Constructor Function
function HornyBeasts (hornyBeast){
  this.image_url = hornyBeast.image_url;
  this.title = hornyBeast.title;
  this.description = hornyBeast.description;
  this.keyword = hornyBeast.keyword;
  this.horns = hornyBeast.horns;
}
//Arrays to help with appending and holding objects
HornyBeasts.allHornyBeasts = [];
HornyBeasts.optionsArry =[];
HornyBeasts.SortArry =[];




//renders handlebars template to the DOM
HornyBeasts.prototype.render = function() {
  let template = $('#handlebarsTemp').html();
  let templateRender = Handlebars.compile(template);
  if(HornyBeasts.optionsArry.includes(this.keyword)){
    console.log('im already alive');
  }else{HornyBeasts.optionsArry.push(this.keyword);
    $('#filter').append(`<option value=${this.keyword}>${this.keyword}</option>`)
  }
  return templateRender(this);
}




// helperfunction that calls a new element to the dom for each object.
HornyBeasts.loadHornyBeasts = () => {
  HornyBeasts.allHornyBeasts.forEach(hornyBeast => $('#hornyBeast-template').append(hornyBeast.render()));
};




//creates a new oject for each element/object in the Json file that is fed as an argument
HornyBeasts.readJson = (page) => {
  $.get(page,'json')
    .then(data => {
      data.forEach(item => {
        HornyBeasts.allHornyBeasts.push( new HornyBeasts(item))
      });
    })
    //render to the dom
    .then(HornyBeasts.loadHornyBeasts);
};





// toggles beasts on and off based on view mode.
$('#filter').on('change', function(){
  let $selection = $(this).val();
  $('section').hide();
  $(`section[id = "${$selection}"]`).show();
});





const sortBeastsHorns = (arr) => arr.sort((a , b) => a.horns - b.horns);
//sorts the page by removing all sections, then calling a sort function then rendering back to the DOM
$('#sort').on('change', function(){
  let $selection = $(this).val();
  console.log($selection);
  
  if( $selection === 'title'){
    $('main section').remove();
    sortBeastsTitle(HornyBeasts.allHornyBeasts);
    HornyBeasts.loadHornyBeasts();

  }else if($selection === 'horns'){
    $('main section').remove();
    sortBeastsHorns(HornyBeasts.allHornyBeasts);
    console.log(HornyBeasts.allHornyBeasts);
    HornyBeasts.loadHornyBeasts();
  }
});





//helper functin that clears out arrays an dom and add initial properties back to page
const pageSelectLoad = () => {
  console.log(`clicky clicky!`);
  $('main section').remove();
  $('option').remove();
  $('#filter').append('<option> Filter by Keyword </option>');
  $('#sort').append('<option>Sort by</option>');
  $('#sort').append(`<option value = title>Title</option>`);
  $('#sort').append(`<option value = horns>Horns</option>`);
  HornyBeasts.allHornyBeasts = [];
  HornyBeasts.optionsArry =[];
}

//Handles Click Event on Page 1 removes all previously generated DOM elements, then clears the corresponding arrays and finally generates new objects to the arrays and appends to the DOM
$('#page1').click(function(){
  pageSelectLoad();
  fileName = '../page-1.json';
  $(() => HornyBeasts.readJson(fileName));
});

//Handles Click Event on Page 2 removes all previously generated DOM elements, then clears the corresponding arrays and finally generates new objects to the arrays and appends to the DOM
$('#page2').click(function(){
  pageSelectLoad();
  fileName = '../page-2.json';
  $(() => HornyBeasts.readJson(fileName));
  console.log(HornyBeasts.allHornyBeasts);
});




// Makes all the things run....Majics!
$(() => HornyBeasts.readJson(fileName));
