# To avoid dynamic linking lets remove dynamic libraries (don't try this at home):
# find /usr/local/Cellar -name "*.dylib" | xargs rm

./configure --disable-docs --without-libomp --without-libtiff --without-libtool --without-little-cms2 --without-threads --without-magick-plus-plus --without-zstd --without-dps --without-fftw --without-flif --without-fpx --without-djvu --without-fontconfig --without-freetype --without-raqm --without-heic --without-jbig --without-lcms --without-lqr --without-openexr --without-pango --without-raw --without-tiff --without-webp --without-xml --enable-shared=no --disable-shared --enable-static
make
rm -rf coders magick images Magick++ tests wand www PerlMagick