function loadGame(url)
{
    let bi = document.querySelector('.broken_image');
    bi.innerHTML = '';
    let step = 0, i = 0, top = 0, left = 0;
    let pos = [];
    for (i = 0; i < 16; i++) {
       if(step < 3)
       {
            pos.push([top * 100, left * 153]);
            left++;
            step++;
       }
       else
       {
            pos.push([top * 100, left * 153]);
            top++;
            left = 0;
            step = 0;
       }
    }
    console.log(pos);
    // add title for the game
    let t = document.createElement('h3');
    t.innerHTML = 'Polar Bear';
    bi.appendChild(t);

    let p = document.createElement('p');
    p.innerHTML = 'choose part of this chicken';
    bi.appendChild(p);

    // add game container
    let container = document.createElement('div');
    container.className = 'container';
    bi.appendChild(container);

    let index = 0;
    addImages();
    function addImages()
    {
        let item = document.createElement('span');
        item.className = 'item';
        let img = new Image(640, 420);
        img.src = url;
        img.onload = function()
        {
            item.appendChild(img);
            img.style.top = -pos[index][0] + 'px';
            img.style.left = -pos[index][1] + 'px';
            item.style.backgroundRepeat = 'no-repeat';
            container.appendChild(item);
            if(index < 15)
            {
                index++;
                addImages();
            }
        }
    }
}

window.onload = function()
{
    loadGame('https://scontent.fgza6-1.fna.fbcdn.net/v/t1.6435-9/151587617_555521398692750_5379230894814214137_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=0hCEQSYYF1wAX_kEFi8&_nc_ht=scontent.fgza6-1.fna&oh=0b857447991238ded3aba0422344ab3e&oe=61AB28D1');
}