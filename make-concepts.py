from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
W,H=1440,900
im=Image.new('RGB',(W,H),(7,14,31)); px=im.load()
for y in range(H):
 for x in range(W):
  a=max(0,1-math.sqrt(((x-150)/900)**2+((y-40)/650)**2)); b=max(0,1-math.sqrt(((x-1370)/800)**2+((y-850)/600)**2)); px[x,y]=(int(7+12*a+20*b),int(14+30*a+12*b),int(31+48*a+45*b))
d=ImageDraw.Draw(im)
try: title=ImageFont.truetype('segoeui.ttf',38); head=ImageFont.truetype('segoeuib.ttf',22); body=ImageFont.truetype('segoeui.ttf',16); tiny=ImageFont.truetype('segoeuib.ttf',13)
except: title=head=body=tiny=ImageFont.load_default()
d.text((66,45),'ARENA TILE DESIGN CONCEPTS',font=title,fill='#f5f7ff'); d.text((68,98),'Three modern arcade directions for Territory Painter',font=body,fill='#aebfda')
items=[('01  NEON CANDY','Glossy, luminous, competitive',('aqua','#13a5df','#0873b3'),('#a7f4ff','#55cafa')),('02  TOYBOX ISLAND','Warm, tactile, softly beveled',('sky','#2598cf','#166ba0'),('#d5b7f4','#a36be0')),('03  PARTY ARCADE','Bold, punchy, full of energy',('cyan','#13b6db','#0878b4'),('#e0a5ff','#9a40db'))]
for idx,(tag,subtitle,blue,purple) in enumerate(items):
 x=65+idx*443; y=153; cw=414; ch=680
 d.rounded_rectangle((x,y,x+cw,y+ch),radius=22,fill='#111e38',outline='#405678',width=2)
 d.text((x+22,y+21),tag,font=tiny,fill='#79c8ed'); d.text((x+22,y+47),subtitle,font=head,fill='#f1f5ff')
 ax=x+18; ay=y+119; aw=cw-36; ah=445
 # board shadow and shell
 d.rounded_rectangle((ax+4,ay+8,ax+aw+4,ay+ah+8),radius=20,fill='#050915')
 shell=['#14294b','#a8794b','#282454'][idx]; border=['#64c7ec','#ffedc1','#ffc855'][idx]
 d.rounded_rectangle((ax,ay,ax+aw,ay+ah),radius=18,fill=shell,outline=border,width=4)
 cols,rows=11,8; gap=5; pad=14; tw=(aw-2*pad-gap*(cols-1))/cols; th=(ah-2*pad-gap*(rows-1))/rows
 for r in range(rows):
  for c in range(cols):
   tx=ax+pad+c*(tw+gap); ty=ay+pad+r*(th+gap)
   own=2 if (c<4 and r>4) or (c<2 and r>2) else 1 if (c>7 and r<3) or (c>5 and r==3) else 0
   if idx==0: empty='#142846'; outline='#345071'; colors=[None,('#70eaff','#118bcf','#06669e'),('#deb4ff','#9153e6','#6337b5')]
   elif idx==1: empty='#b99160'; outline='#e1bf8b'; colors=[None,('#81e7f5','#278fc3','#126393'),('#e8c2fa','#9c64d6','#673ba0')]
   else: empty='#201f49'; outline='#4d4779'; colors=[None,('#6beafa','#04a6cc','#056c9c'),('#e3a2ff','#a342d7','#672da1')]
   if own:
    top,mid,bot=colors[own]; d.rounded_rectangle((tx,ty+3,tx+tw,ty+th+4),radius=5,fill=bot); d.rounded_rectangle((tx,ty,tx+tw,ty+th),radius=5,fill=mid,outline=top,width=2); d.line((tx+5,ty+3,tx+tw-5,ty+3),fill='#ffffffa0',width=2)
   else: d.rounded_rectangle((tx,ty,tx+tw,ty+th),radius=4,fill=empty,outline=outline,width=1)
 # players
 for cx,cy,fill,edge,glow in [(ax+aw*.76,ay+ah*.12,'#25c7f0','#e8fdff','#0875b3'),(ax+aw*.18,ay+ah*.75,'#b16ee8','#fff0ff','#6b35bb')]:
  rad=22; d.rounded_rectangle((cx-rad,cy-rad+5,cx+rad,cy+rad+6),radius=10,fill=glow); d.rounded_rectangle((cx-rad,cy-rad,cx+rad,cy+rad),radius=10,fill=fill,outline=edge,width=4); d.ellipse((cx-10,cy-5,cx-5,cy+2),fill='#152242'); d.ellipse((cx+5,cy-5,cx+10,cy+2),fill='#152242')
 # pickup star
 cx=ax+aw*.50; cy=ay+ah*.52; d.ellipse((cx-20,cy-20,cx+20,cy+20),fill='#f6b928',outline='#fff1ac',width=3); d.text((cx-9,cy-13),'★',font=body,fill='white')
 # legend and description
 d.rounded_rectangle((x+22,y+588,x+cw-22,y+642),radius=13,fill='#0b1429',outline='#344968'); d.ellipse((x+38,y+605,x+51,y+618),fill='#28c3e9'); d.text((x+59,y+600),'Player 1',font=body,fill='#dceaff'); d.ellipse((x+167,y+605,x+180,y+618),fill='#b16ee8'); d.text((x+188,y+600),'Player 2',font=body,fill='#dceaff'); d.text((x+315,y+598),'✦',font=head,fill='#ffd34f')
 captions=['Cool neon glass, dark board and crisp highlights.','Sunlit toy board with warm ceramic tiles.','High-contrast pop colors and playful glow.'][idx]
 d.text((x+22,y+652),captions,font=body,fill='#acbdd8')
im.save('D:/fatima/territory-painter/design-concepts.png')
