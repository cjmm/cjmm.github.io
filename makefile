# .PHONY: css
# css:
# 	mkdir -p bundle
# 	postcss --watch --use autoprefixer --use postcss-import css/jquery.npc_cppcc_cover.css --output bundle/jquery.npc_cppcc_cover.css

.PHONY: server
server:
	browser-sync start --server --files='index.html, js/index.js, css/index.css'

# .PHONY: clean
# clean:
# 	rm -r bundle
