# SCM Orça

Orçamentação de impressão 3D pelo custo real de produção — SCM Projects.

Aplicação de página única, sem servidor e sem base de dados. Os dados ficam
guardados no navegador do dispositivo onde é usada, e não sincronizam entre
dispositivos (usar Exportar / Importar em Parâmetros para os transferir).

## Ficheiros

| Ficheiro | Para que serve |
|---|---|
| `index.html` | a aplicação inteira |
| `manifest.webmanifest` | permite instalar como aplicação |
| `sw.js` | funcionamento sem internet |
| `icone-192.png`, `icone-512.png`, `scm-orca.ico` | ícones |

## Publicar

Com GitHub Pages: Settings → Pages → Source: `main`, pasta `/ (root)`.

## Atualizar

Substituir `index.html` e incrementar o número em `CACHE`, dentro de `sw.js`
(de `scm-orca-v1` para `scm-orca-v2`). Sem isso, os dispositivos que já
instalaram continuam a ver a versão antiga.
