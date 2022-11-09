import psycopg2

conn = psycopg2.connect(
    user="admin",
    password="admin",
    host="db",
    port="5432",
    database="ecom"
)
cur = conn.cursor()

cur.execute(
    """TRUNCATE TABLE product, brand, cart_item, "user", cart RESTART IDENTITY""")
cur.execute("""INSERT INTO brand(name) VALUES('Gucci')""")
cur.execute("""INSERT INTO brand(name) VALUES('Versace')""")
cur.execute("""INSERT INTO brand(name) VALUES('NYC')""")
cur.execute("""INSERT INTO brand(name) VALUES('Dior')""")


sql = """INSERT INTO product(name,image,brand_id,description,price,quantity) VALUES(%s,%s,%s,%s,%s,%s)"""
params = ('Wool coat with belt', 'https://media.gucci.com/style/White_Center_0_0_250x170/1659028539/715724_ZHW03_1043_001_100_0000_Light-Wool-coat-with-belt.jpg', 1,
          'Classic outerwear pieces continue to be reimagined in creative ways through emblematic House symbols. Here, a subtle nod to Gucci\'s heritage can be found on the vintage Interlocking G buttons, that decorate and add functionality to the coat.', 4200, 3)
cur.execute(sql, params)
params = ('Tweed wool cape with pockets', 'https://media.gucci.com/style/White_Center_0_0_250x170/1665650766/715715_Z8A5G_1000_001_100_0000_Light-Tweed-wool-cape-with-pockets.jpg', 1,
          'With an undeniable retro attitude, elevated fabrics and patterns decorate a selection of outerwear pieces. Vintage elements still permeate the House\'s aesthetic, blending seamlessly with the contemporary for an updated yet never-out-of-style wardrobe. This cape is crafted from black tweed wool.', 5800, 1)
cur.execute(sql, params)
params = ('SNAKE-PRINT SHEATH DRESS', 'https://res.cloudinary.com/nycoftf/image/upload/b_auto,c_pad,dpr_1.0,f_auto,h_682,q_auto,w_512/e_sharpen:100/c_pad,h_682,w_512/v1/Upload/07713234_010?pgw=1', 3,
          'New! Introducing our Magic Crepe® fabric - Stretchy, slimming, sleek & sexy! Wrinkle free, moves with you and complements your curves. In red snake-print with a sheath silhouette, this dress is perfect for the season.', 79.95, 5)
cur.execute(sql, params)
params = ('HUNKY CABLE-ACCENT SWEATER DRESS', 'https://res.cloudinary.com/nycoftf/image/upload/b_auto,c_pad,dpr_1.0,f_auto,h_682,q_auto,w_512/e_sharpen:100/c_pad,h_682,w_512/v1/Upload/07703240_531?pgw=1', 3,
          'Rendered in a shift silhouette with chunky, cable-knit accents down the front, this sweater dress is an instant classic.', 79.95, 5)
cur.execute(sql, params)
params = ('MEDUSA LA GRECA KNIT MIDI DRESS', 'https://www.versace.com/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw67925c2a/original/90_1007279-1A05236_1B000_10_MedusaLaGrecaKnitMidiDress-Dresses-versace-online-store_0_0.jpg?sw=748&sh=1050&sm=fit&sfrm=jpg', 2,
          'In a tonal jacquard La Greca pattern, this ribbed bodycon midi dress features Medusa hardware accents on the shoulder straps.', 1595, 2)
cur.execute(sql, params)
params = ('CORSET MINI DRESS', 'https://www.versace.com/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw7cefd9af/original/90_1006880-1A05161_1R690_10_CorsetMiniDress-Dresses-versace-online-store_2_0.jpg?sw=748&sh=1050&sm=fit', 2,
          'A reworking of the signature Atelier Versace corset, this long-sleeved mini dress is cinched at the waist with a detachable, V-shaped corset belt that accentuates the form. Crafted from wool with wide sharp shoulders, Medusa hardware and a logo tag accent the piece.', 4025, 2)
cur.execute(sql, params)
params = ('"I ♡ YOU BUT…" HOODIE', 'https://www.versace.com/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw2c0c5184/original/90_1007267-1A05403_1PI30_10_IYouButHoodie-Sweatshirts-versace-online-store_1_1.jpg?sw=748&sh=1050&sm=fit', 2,
          'This hooded sweatshirt features the slogan "I <3 You But I\'ve Chosen Versace" in velvet across the front with a crystal-embellished heart motif. The casual style is complete with a kangaroo pocket.', 1325, 3)
cur.execute(sql, params)


params = ('DENIM COUTURE SHIRT DRESS', 'https://media.dior.com/couture/ecommerce/media/catalog/product/h/X/1666878317_312R17A3517_X5651_E01_ZHC.jpg?imwidth=870', 4,
          'The shirt dress is reinterpreted this season in a couture variation. Crafted in blue raw cotton denim, it presents a silhouette enhanced by a spread collar and gathered details, offering a frilled effect at the hem. The contrasting belt that highlights the waist reveals the Christian Dior signature. The shirt dress can be paired with ballet pumps from the collection for a refined look.', 3300, 1)
cur.execute(sql, params)


params = ('SHIRT DRESS WITH BELT', 'https://media.dior.com/couture/ecommerce/media/catalog/product/K/D/1656679736_257R38A3125_X0810_E01_ZHC.jpg?imwidth=870', 4,
          'The shirt dress showcases the collection\'s signature motif, Dior Jardin d\'Hiver, offering a poetic and exotic representation of Mr. Dior\'s wall tapestries. Crafted in ecru cotton and silk poplin, it features a flared silhouette enhanced by a tied belt and pleat work highlighting the waist. The dress can be paired with other Dior Jardin d\'Hiver creations to complete the look.', 4900, 1)
cur.execute(sql, params)

params = ('MID-LENGTH BELTED DRESS', 'https://media.dior.com/couture/ecommerce/media/catalog/product/y/T/1656679842_257R46A3419_X1810_E01_ZHC.jpg?imwidth=870', 4,
          'The dress showcases the collection\'s signature motif, Dior Jardin d\'Hiver, offering a poetic and exotic representation of Mr. Dior\'s wall tapestries. Crafted in beige cotton gabardine, it features a flared silhouette enhanced by a tonal belt, large patch pockets and pleat work highlighting the waist. The dress can be paired with other Dior Jardin d\'Hiver creations to complete the look.', 3800, 3)
cur.execute(sql, params)

params = ('FITTED DRESS WITH \'CD\' BUTTONS', 'https://media.dior.com/couture/ecommerce/media/catalog/product/v/8/1658756814_111R07A1166_X9009_E01_ZHC.jpg?imwidth=870', 4,
          'The black short-sleeved dress has a refined silhouette. Cut in lightweight wool and silk, it has a cropped silhouette that accentuates the waist. Three \'CD\' buttons enhance the neckline and lend a refined touch to the piece. The versatile dress can be worn with numerous pieces from the Dior wardrobe for an elegant style.', 3200, 2)
cur.execute(sql, params)

params = ('MID-LENGTH SHIRT DRESS', 'https://media.dior.com/couture/ecommerce/media/catalog/product/a/9/1655743282_241R42A6553_X2829_E01_ZHC.jpg?imwidth=870', 4,
          'The shirt dress showcases the Dior Pixel Zodiac motif, reinterpreting astrological signs in a whimsical and colorful universe. Crafted in yellow silk chiffon, it boasts a flowing silhouette enhanced by a spread collar and pleat work that highlights the waist. The ethereal shirt dress can be paired with other Dior Pixel creations to complete the look.', 5000, 1)
cur.execute(sql, params)


conn.commit()
