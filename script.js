$(document).ready(function() {
    // Load sidebar content
    $('.sidebar').load('Sidebar.html', function() {
        
        function toggleSubmenu(btn) {
            var submenu = btn.next('.ChPre_show, .Dis_show');
            $('.ChPre_show, .Dis_show').not(submenu).removeClass("show");
            $('.fa-caret-down').not(btn.find('.fa-caret-down')).removeClass("rotate");
            submenu.toggleClass("show");
            btn.find('.fa-caret-down').toggleClass("rotate");
        }

        $(document).on('click', '.ChPre_btn, .Dis_btn', function(event) {
            event.preventDefault();
            var btn = $(this);
            toggleSubmenu(btn);
            // Store menu state in sessionStorage
            var menuState = { 
                activeMenu: btn.attr('class'),
                submenuVisible: btn.next('.ChPre_show, .Dis_show').hasClass('show')
            };
            sessionStorage.setItem('menuState', JSON.stringify(menuState));
            // window.location.href = btn.attr('href');
        });

        $(document).on('click', 'nav ul li', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });

        $(document).on('click', '.ChPre_show li, .Dis_show li', function(event) {
            event.stopPropagation(); // Prevent event bubbling
            $('.ChPre_show, .Dis_show').addClass("show");
        });

        // Restore menu state from sessionStorage
        var storedMenuState = sessionStorage.getItem('menuState');
        if (storedMenuState) {
            storedMenuState = JSON.parse(storedMenuState);
            $('.' + storedMenuState.activeMenu).next('.ChPre_show, .Dis_show').toggleClass("show", storedMenuState.submenuVisible);
            $('.' + storedMenuState.activeMenu).find('.fa-caret-down').toggleClass("rotate", storedMenuState.submenuVisible);
        }
    });
});
