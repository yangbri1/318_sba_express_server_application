import { comments } from "../data/comments.mjs";

/* practicing D.R.Y. (Don't Repeat Yourself):
   helper function for filtering out user specific information */
export default function user_info(route_params, category, userId, id){
    // iterate through the category
    let itr = 0;
    while(itr < category.length){

        let userId = comments[itr].userId;
        
        // if the userId in the database matches up with the requested userId
        if(category[itr].userId == route_params.params.id){
            // append their category to the the empty_array
            empty_array.push(category[itr]);
        }
        // increment by 1 to continue cycling through
        itr++;
    }
};

// // iterate through the array of comments
// let itr = 0;
// while(itr < comments.length){
//     // if the userId in the database matches up with the requested userId
//     if(comments[itr].userId == route_params.userId){
//         // append their comment to the the empty_array
//         empty_array.push(comments[itr]);
//     }
//     // increment by 1 to continue cycling through
//     itr++;
// }
