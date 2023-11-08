const validatePost = (post) => {
    const errors = {};
    const allowedplatforms = ["xbox", "PS2", "Linux", "PS Vita", "Android", "Xbox One", "Nintendo Switch", "iOS", "macOS", "PC", "Xbox 360", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Web"]
    const allowedGenres = ["Action", "Casual", "Adventure", "RPG", "Indie", "Strategy", "Shooter", "Simulation", "Puzzle", "Arcade", "Platformer", "Massively Multiplayer", "Racing", "Sports", "Fighting", "Family", "Board Games", "Educational", "Card"];
    
    if (!post.name) {
      errors.name = 'Empty name';
    } else if (post.name.length > 35) {
      errors.name = 'Name exceeds 35 characters';
    }
  
    if (!post.description) {
      errors.description = 'Empty description';
    } else if (post.description.length < 20 || post.description.length > 255) {
      errors.description = 'Description length must contain 20-255 characters';
    }
  
    if (!post.releaseDate){
      errors.releaseDate = 'Need a valid date'
    }
    if (!Array.isArray(post.genreNames) || post.genreNames.length === 0) {
      errors.genreNames = 'No genres selected';
    } else if (!post.genreNames.every(genre => allowedGenres.includes(genre))) {
      errors.genreNames = 'Invalid genre selected';
    }
    if(!Array.isArray(post.platforms)|| post.platforms.length === 0) {
      errors.platforms = 'No platforms Selected';
    }else if (!post.platforms.every(platform => allowedplatforms.includes(platform))){
      errors.platforms = 'Invalid platform selected'
    }

  
    return errors;
  }
  
  export default validatePost;
  