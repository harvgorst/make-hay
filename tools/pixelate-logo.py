# Makes brand/make-hay-logo-pixel.png: the owner's scythe artwork as pixel art in its own colours (2.3.1 uses 112 pixels across).
# Usage: python3 tools/pixelate-logo.py 112
import sys
from PIL import Image
import numpy as np
ROOT=__import__('os').path.join(__import__('os').path.dirname(__file__),'..')
src=Image.open(ROOT+'/brand/make-hay-logo-art.png').convert('RGB')
CREAM=np.array([0xFD,0xF8,0xE1],float)
art=np.asarray(src,float)[69:931,118:1136]
d=np.abs(art-CREAM).sum(2); m=(d>60).astype(float)
hexs=['6B6F38','7F8547','555A2A','AC8253','C49A68','7A5430','87847E','A8A59E','66635D','4E4B42']
pal=np.array([[int(h[i:i+2],16) for i in (0,2,4)] for h in hexs],float)
H,W=m.shape
for g in map(int,sys.argv[1:]):
    h=round(H*g/W); out=np.zeros((h,g,3),np.uint8)
    for y in range(h):
        y0,y1=int(y*H/h),int((y+1)*H/h)
        for x in range(g):
            x0,x1=int(x*W/g),int((x+1)*W/g)
            mm=m[y0:y1,x0:x1]
            if mm.mean()<0.42: out[y,x]=CREAM; continue
            c=(art[y0:y1,x0:x1]*mm[...,None]).sum((0,1))/mm.sum()
            out[y,x]=pal[np.argmin(((pal-c)**2).sum(1))]
    Image.fromarray(out).save(ROOT+'/brand/make-hay-logo-pixel.png')
