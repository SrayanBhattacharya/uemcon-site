import xml.etree.ElementTree as ET
import re

def get_bounding_box(svg_file):
    # This is a very rough script just to read viewBox and check if it's symmetrical.
    tree = ET.parse(svg_file)
    root = tree.getroot()
    viewBox = root.attrib.get('viewBox')
    width = float(root.attrib.get('width', 0))
    height = float(root.attrib.get('height', 0))
    print(f"ViewBox: {viewBox}")
    print(f"Width: {width}, Height: {height}")
    
    # We can't easily parse all SVG paths without a heavy library, 
    # but let's see if we can just look at the transforms.
    
if __name__ == '__main__':
    get_bounding_box('/home/srayan/Projects/uemcon-site/public/logo.svg')
