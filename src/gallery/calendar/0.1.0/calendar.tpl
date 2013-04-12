<div class="calendar" style="position: static; visibility: visible;">
    <div class="calendar-pages">
        <% for( var pageIndex = 0; pageIndex < pages; pageIndex++ ) { %>
            <div data-bx="page" data-bxconfig="{
                pages: <%=pages%>,
                pageIndex: <%=pageIndex%>,
                year: <%=year%>,
                month: <%=month + pageIndex%>,
                day: <%=day%>,
                rangeSelect: <%=rangeSelect%>
            }" class="calendar-pagewraper"></div>
        <% } %>
    </div>

    <div bx-tmpl="calendar" bx-datakey="notLimited,multiSelect,showTime,op_html" class="calendar-operator">
        <a class="btn btn-size25 btn-calendar-confirm">确定</a>
        <a class="btn btn-size25 btn-calendar-notlimited">不限</a>
    </div>
</div>