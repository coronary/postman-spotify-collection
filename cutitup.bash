clearfix="<div class=\"clearfix\"><\/div>"
console="Try in our Web Console<\/a><\/p>"
section_start="$clearfix\n<section class=\"endpoint\">"
section_end="$console\n<\/section>"

sed  -i "s/$clearfix/$section_start/"  working.html
sed  -i "s/$console/$section_end/"  working.html