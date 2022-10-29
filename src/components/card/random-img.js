import imgList from '../../presets/image-links.json';

export function randomImg() {
    return imgList[Math.floor(Math.random() * imgList.length)].link;
}
