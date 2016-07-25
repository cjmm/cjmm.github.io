# # .PHONY: css
# # css:
# # 	mkdir -p bundle
# # 	postcss --watch --use autoprefixer --use postcss-import css/jquery.npc_cppcc_cover.css --output bundle/jquery.npc_cppcc_cover.css
#
# .PHONY: server
# server:
# 	browser-sync start --server --files='index.html, js/index.js, css/index.css'
#
# # .PHONY: clean
# # clean:
# # 	rm -r bundle


.PHONY: css
css:
	mkdir -p src/static
	postcss --watch --use autoprefixer --use postcss-import src/static/index.css --output src/static/index.min.css

.PHONY: css2
css2:
	mkdir -p src/static
	postcss --watch --use autoprefixer --use postcss-import src/static/channel.css --output src/static/channel.min.css

.PHONY: js
js:
	mkdir -p src/static
	babel --watch src/static/index.js --out-file src/static/index.min.js

.PHONY: js2
js2:
	mkdir -p src/static
	babel --watch src/static/footer.js --out-file src/static/footer.min.js

.PHONY: server
server:
	browser-sync start --server --files='src'

# .PHONY: clean
# clean:
# 	rm -r src/static

.PHONY: all
all:
	make css & make css2 & make js & make js2 & make server & wait
