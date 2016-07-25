# .PHONY: folder
# folder:
# 	mkdir -p bundle

.PHONY: css
css:
	mkdir -p dev/bundle
	postcss --watch --use autoprefixer --use postcss-import dev/css/index.css --output dev/bundle/index.css

.PHONY: js
js:
	mkdir -p dev/bundle
	babel --watch dev/js/index.js --out-file dev/bundle/index.js

.PHONY: server
server:
	browser-sync start --server --files='index.html, dist, dev'

.PHONY: clean
clean:
	rm -r dev/bundle

.PHONY: all
all:
	# make folder & make css & make js & make server & wait
	make css & make js & make server & wait
