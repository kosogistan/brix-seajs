<div class="calendar-page">
    <!-- 年月 -->
    <div class="calendar-page-hd">
        <% if( pageIndex === 0) { %>
        <div bx-mpl="page" bx-datakey="prev">
            <a href="javascript:;" class="calendar-prev-year"><i class="iconfont">&#403</i><i class="iconfont icon-yp">&#403</i></a>
            <a href="javascript:;" class="calendar-prev-month"><i class="iconfont">&#403</i></a>
        </div>
        <% } %>
        <a bx-tmpl="yearmonth" data-bxkey="year,month" href="javascript:;" class="calendar-year-month">
            <%=year%>年<%=month+1%>月
        </a>
        <% if( pageIndex === pages - 1) { %>
        <div bx-tmpl="next" bx-datakey="next">
            <a href="javascript:;" class="calendar-next-month "><i class="iconfont">&#402</i></a>
            <a href="javascript:;" class="calendar-next-year "><i class="iconfont icon-yn">&#402</i><i class="iconfont">&#402</i></a>
        </div>
        <% } %>
        <div class="calendar-year-month-pupop">
            <p bx-tmpl="select" bx-datakey="month,select_html">
                月:
            </p>
            <p bx-tmpl="year" bx-datakey="year">
                年:
            </p>
            <p>
                <a class="btn btn-size25 btn-pupop-confirm">确定</a><a class="btn-pupop-cancel" href="#">取消</a>
            </p>
        </div>
    </div>
    <!-- 星期标签 -->
    <div bx-tmpl="pagewbd" bx-datakey="startDay,days_html" class="calendar-page-wbd">
        <% for( var i = 0; i < dayLabels.length; i++ ) { %>
            <span><%= dayLabels[i] %></span>    
        <% } %>
    </div>
    <!-- 日列表 -->
    <div bx-tmpl="pagedbd" data-bxkey="year,month,day,startDay,selected,range,rangeStart,rangeEnd,multi,disabled,minDate,maxDate" bx-datakey="startDay,year,month,selected,range,multi,disabled,minDate,maxDate,da_html" class="calendar-page-dbd">
        <% for( var i = 0; i < offset(); i++ ) { %>
            <a class="calendar-hidden" href="javascript:;">-</a>
        <% } %>
        <% for( var i = 1; i <= days(); i++ ) {
            var className = 'calendar-item';
            if( year === today.getFullYear() && month === today.getMonth() && i === today.getDate() ) className += ' calendar-today';
            if( i === day ) className += ' calendar-selected';
            if( rangeSelect && rangeStart && rangeEnd ) {
                var cur = new Date(year, month, i).getTime();
                if( cur > rangeStart.getTime() && cur < rangeEnd.getTime() ) {
                    console.log('=====', i, rangeStart && rangeStart.getDate(), rangeEnd && rangeEnd.getDate());
                    className += ' calendar-range';
                }
            }
            print('<a class="' + className + '" href="javascript:;">' + i + '</a>');
        } %>
    </div>
    <!-- 时间 TODO -->
    <div class="calendar-page-fd"></div>
</div>