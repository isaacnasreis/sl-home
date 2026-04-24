import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcPath = path.resolve('public/assets/img/LogoSemFundo.png');
const destPath = path.resolve('src/assets/img/LogoSemFundo.png');

console.log('Tentando recriar a imagem com Sharp para limpar metadados corrompidos...');

sharp(srcPath)
  .png()
  .toFile(destPath)
  .then(info => {
    console.log('Imagem recriada com sucesso!', info);
  })
  .catch(err => {
    console.error('Erro ao recriar:', err);
    // Tenta bypass se o Sharp falhar no parse inicial (às vezes funciona lendo como buffer raw)
  });
