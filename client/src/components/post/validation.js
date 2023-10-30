const validatePost = (post) => {
    const errors = {};
  
    const allowedPlatforms = ["xbox", "PS2", "PC", "Switch"];
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
  
  
    if (!Array.isArray(post.genreNames) || post.genreNames.length === 0) {
      errors.genreNames = 'No genres selected';
    } else if (!post.genreNames.every(genre => allowedGenres.includes(genre))) {
      errors.genreNames = 'Invalid genre selected';
    }
  
    return errors;
  }
  
  export default validatePost;
  