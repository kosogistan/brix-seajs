<div class="dropdown">
	<div class="dropdown-head">
	    <span class="dropdown-text" value="<%=value%>"><%=text%></span>
	    <i class="iconfont icon-arrow-down">&#459</i>
	</div>
	<ul class="dropdown-list">
	    <% for(var i = 0; i < list.length; i++ ) { %>
	    <li data-bxkey="" class="dropdown-item">
	        <span value="<%=list[i].value%>"><%=list[i].text%></span>
	        <i class="iconfont icon-ok">&#126</i>
	    </li>
	    <% } %>
	</ul>
</div>