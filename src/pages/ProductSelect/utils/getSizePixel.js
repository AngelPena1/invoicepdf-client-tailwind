export function getSizePixel(value) {
    let pixel;
  
    switch (value) {
      case "small":
        pixel = 18;
        break;
  
      case "medium":
        pixel = 26;
        break;
  
      case "large":
        pixel = 36;
        break;
      default:
        break;
    }
    return pixel;
  }