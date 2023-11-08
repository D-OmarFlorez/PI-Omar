const validatePost = (post) => {
    const errors = {};
    
    if (!post.name) {
      errors.name = 'Empty name';
    } else if (post.name.length > 35) {
      errors.name = 'Name exceeds 35 characters';
    }
  
    if (!post.description) {
      errors.description = 'Empty description';
    } else if (post.description.length < 20 || post.description.length > 500) {
      errors.description = 'Description length must contain 20-500 characters';
    }
  
    if (!post.releaseDate){
      errors.releaseDate = 'Need a valid date'
    }
    if (!Array.isArray(post.genreNames) || post.genreNames.length === 0) {
      errors.genreNames = 'No genres selected';
    }
    if(!Array.isArray(post.platforms)|| post.platforms.length === 0) {
      errors.platforms = 'No platforms Selected';
    }

  
    return errors;
  }
  
  export default validatePost;
  