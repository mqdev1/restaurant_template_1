$(function(){
    let mode = localStorage.getItem('mode') || 'light';
    document.body.className = mode;
    
    // read and write items to localStorage
    function readFromLocalStorage(itemName, isJson = false)
    {
        if(undefined == itemName || null == itemName)
        {
            return null;
        }
        let item = localStorage.getItem(itemName);
        if(null !== item)
        {
            if(isJson)
            {
                return JSON.parse(item);
            }
            else
            {
                return item;
            }
        }
        return null;
    }
    function writeToLocalStorage(key, value, isJson = false)
    {
        if(undefined == key || null == key || 
        undefined == value || null == value)
        {
            return null;
        }

        if(isJson)
        {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else
        {
            localStorage.setItem(key, value)
        }
    }
    function removeItemFromLocalStorage(key)
    {
        if(null == key)
        {
            return;
        }
        localStorage.removeItem(key);
    }

    removeItemFromLocalStorage('cart');
    writeToLocalStorage('cart', [
        {
            item_id : 1,
            item_price : 22,
            item_image : 'https://via.placeholder.com/40?text=item+20$',
            item_qity : 3
        }
    ], true);

    // read list of items from cart
    let cart = readFromLocalStorage('cart');
    let cart_items = document.querySelector('.dropdown-menu-orders');
    if(null != cart && null != cart_items)
    {
        elementjs.do();
        Array.from(cart).forEach(item=>{
            let item_container = set(cart_items, 'a');
            let item_image = set(item_container, 'img');
            let container_fluid = set(item_container, 'div');
            let p = set(container_fluid, 'p');
            let small = set(p, 'small');

        });
    }

    $('.mode').click(function(){
        let obj = this;
        let mode_type = obj.querySelector('small');
        if(document.body.className == 'dark')
        {
            document.body.className = 'light';
            mode_type.innerText = 'dark_mode';
            localStorage.setItem('mode', 'light');
        }
        else
        {
            document.body.className = 'dark';
            mode_type.innerText = 'light_mode';
            localStorage.setItem('mode', 'dark');
        }
    });
    let gallery_item = $('.gallery-item');
    $('.gallery-item').click(function(){
        $content = $(this).html();
        $('.modal-body').html($content);
    });
    let gallery_index = 0;
    $('.modal-body').click(function(){
        $content = gallery_item.eq(gallery_index).html();
        $(this).html($content);
        $(this).fadeOut(0);
        if(gallery_index+1 < gallery_item.length)
        {
            gallery_index+=1;
        }
        else
        {
            gallery_index = 0;
        }

        $(this).fadeIn('fast');
    });
    
    let i = 0;
    let slides = document.querySelectorAll('.image-slider');
    for(i = 0; i < slides.length; i++)
    {
        new Splide( slides[i] ,{
            type: "loop",
              perPage: 5,
              breakpoints: {
                1024: {
                  perPage: 3,
                 
                },
                767: {
                  perPage: 2,
              
                },
                640: {
                  perPage: 1,
                },
              },
              focus: "center",
              gap: '.2em',
              updateOnMove : true,
              pagination: false,
          } ).mount();
    }
});