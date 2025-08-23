#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create a 32x32 favicon
size = 32
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Create a gradient-like effect with a circle
# Draw multiple circles with varying opacity for gradient effect
center = size // 2
radius = 14

# Background circle with gradient effect
for i in range(radius, 0, -1):
    alpha = int(255 * (radius - i + 1) / radius)
    color = (37, 99, 235, alpha)  # Blue gradient
    draw.ellipse([center-i, center-i, center+i, center+i], fill=color)

# Try to load a font, fallback to default if not available
try:
    font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
except:
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/arial.ttf", 16)
    except:
        font = ImageFont.load_default()

# Draw "CK" text
text = "CK"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
text_x = (size - text_width) // 2
text_y = (size - text_height) // 2 - 1

# Draw text with slight shadow effect
draw.text((text_x+1, text_y+1), text, font=font, fill=(0, 0, 0, 128))  # Shadow
draw.text((text_x, text_y), text, font=font, fill=(255, 255, 255, 255))  # Main text

# Save as ICO
img.save('favicon.ico', format='ICO', sizes=[(16,16), (32,32)])

# Also save as PNG for manifest
img_png = img.resize((192, 192), Image.Resampling.LANCZOS)
img_png.save('favicon-192.png', format='PNG')

img_png_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
img_png_512.save('favicon-512.png', format='PNG')

print("Favicon files created successfully!")
