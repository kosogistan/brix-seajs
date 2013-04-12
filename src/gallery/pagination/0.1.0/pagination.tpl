<div class="pagination clearfix">
    <% if( statistics ){ %>
    <div class="pagination-info">
        <span>当前</span><span class="b"><%=start%>-<%=end%></span><span>条</span>
        <span class="mr">共</span><span class="b"><%=total%></span><span>条</span>
        <span class="mr">每页展现</span>
        <select data-bx="dropdown" class="dropdown">
            <% for( var i = 0, limits = [10,15,20,30,50]; i < limits.length; i++ ) { %>
            <option value="<%=limits[i]%>" <%= limits[i] == limit ? 'selected' : '' %>>
                <%=limits[i]%>
            </option>
            <% } %>
        </select>
        <span>条</span>
    </div>
    <% } %>
    <div class="pagination-pages">
        <div class="pagination-page">
            
            <% if( hasPrev ) { %>
                <a href="javascript: void(0);" class="page-prev"><i class="iconfont">&#403</i><span>&nbsp;上一页</span></a>
            <% } else { %>
                <span class="page-disabled"><i class="iconfont">&#403</i><span>&nbsp;上一页</span></span>
            <% } %>

            <% if( simplify ) { %>
                <span class="page-simply"><%=cursor%>/<%=pages%></span>
            <% } else { %>

                <% if( barstart >= 3 ) { %>
                    <a class="page" href="javascript: void(0);">1</a>
                    <a class="page" href="javascript: void(0);">2</a>
                    <% if( barstart > 3 ) { %>
                        <span class="page-split">...</span>
                    <% } %>
                <% } else if( barstart == 2 ) { %>
                    <a class="page" href="javascript: void(0);">1</a>
                <% } %>

                <% for( var i = barstart; i <= barend; i++ ) { %>
                    <% if( i ===  cursor ) { %>
                        <span class="page-cur"><%= i %></span>
                    <% } else { %>
                        <a class="page" href="javascript: void(0);"><%= i %></a>    
                    <% } %>
                <% } %>
                
                <% if( barend < pages - 1) { %>
                    <span class="page-split">...</span>
                <% } %>
                <% if( barend < pages) { %>
                    <a class="page" href="javascript: void(0);"><%=pages%></a>
                <% } %>
            
            <% } %>

            <% if( hasNext ) { %>
                <a href="javascript: void(0);" class="page-next"><span>下一页&nbsp;</span><i class="iconfont">&#402</i></a>
            <% } else { %>
                <a href="javascript: void(0);" class="page-disabled"><span>下一页&nbsp;</span><i class="iconfont">&#402</i></a>
            <% } %>

        </div>
        <div class="pagination-count">
            <span>共</span><span class="b"><%=pages%></span><span>页</span>
        </div>
        <div class="pagination-form">
            <span>向第</span><input class="page-num" name="page" type="text"><span>页</span><a tabindex='0' class="btn-jump btn btn-size25">跳转</a>
        </div>
    </div>
</div>