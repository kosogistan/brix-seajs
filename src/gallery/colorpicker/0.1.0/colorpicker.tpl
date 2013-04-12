<div class="colorpicker">
    <div class="colorpicker-hd">
        <ul>
            <% for(var i = 0; i < colors.length; i++) { %>
            <li val="<%=colors[i]%>" style="background-color:<%=colors[i]%>;"></li>
            <% } %>
        </ul>
    </div>
    <div class="colorpicker-md">
        <i class="iconfont icon-arrow <%= min ? '' : 'icon-arrow-up' %>">
            <%= min ? '&#405' : '&#404' %>
        </i>
    </div>
    <div class="colorpicker-bd <%= min ? 'colorpicker-bd-min' : ''%>">
        <div class="picker-wrapper">
            <div class="picker"></div>
            <i class="iconfont icon-picker-indicator">&#470</i>
        </div>
        <div class="slide-wrapper">
            <div class="slide"></div>
            <i class="iconfont icon-slide-indicator">&#461</i>
        </div>
    </div>
    <div class="colorpicker-fd">
        <span class="bg" style="background-color:<%=color%>"></span><input class="input" value="<%=color%>"><a class="btn btn-size25 btn-confirm">确定</a>
    </div>
</div>