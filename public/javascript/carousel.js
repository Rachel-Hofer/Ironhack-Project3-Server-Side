// $(document).ready(function() { // when the document is loaded
  
//     let properties;
//     let propertyNum = 0;
       
//     axios.get('http://localhost:3000/api/all-properties')
//         .then((theProperties)=>{
//             properties = theProperties.data;
//         })
//             .catch((err)=>{
//                 console.log('THIS IS AN ERROR',err);
//      })
        
    
//     //carousel right click
//     $("#right_button").click(function() {
    
//         $('#theImageHolder').html(`<img class="clothingImg" src="${properties[propertyNum].image}">`)
//         // $("#propertyDetail").prop("href", `/clothing/${properties[propertyNum]._id}`)
//         // $("#propertyEdit").prop("href", `'/edit-property/${properties[propertyNum]._id}`)
//         // $("#propertyDelete").prop("href", `/clothing/${properties[propertyNum]._id}/delete`)
//         propertyNum++;
//     })
    


    
//     //carousel left click
//     $("#left_button").click(function() {
//         propertyNum--;
//         $('#theImageHolder').html(`<img class="clothingImg" src="${properties[propertyNum].image}">`)
//         // $("#topDetail").prop("href", `/clothing/${properties[propertyNum]._id}`)
//         // $("#topEdit").prop("href", `/clothing/${properties[propertyNum]._id}/update`)
//         // $("#topDelete").prop("href", `/clothing/${properties[propertyNum]._id}/delete`)
//     })
    

    
    
    
    
    

    
//     }) // end of JQuery wrap