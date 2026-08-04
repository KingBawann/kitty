from PIL import Image, ImageEnhance, ImageFilter
import sys

def enhance_image(input_path, output_path):
    img = Image.open(input_path)
    
    # Upscale 2x
    new_size = (img.width * 2, img.height * 2)
    img = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # Sharpen
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    # Contrast
    enhancer_contrast = ImageEnhance.Contrast(img)
    img = enhancer_contrast.enhance(1.1)
    
    # Color
    enhancer_color = ImageEnhance.Color(img)
    img = enhancer_color.enhance(1.15)
    
    img.save(output_path, "PNG")
    print(f"Successfully enhanced {input_path} to {output_path}")

if __name__ == "__main__":
    enhance_image(sys.argv[1], sys.argv[2])
