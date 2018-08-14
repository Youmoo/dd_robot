/**
 * java 异常栈
 */
const stack_trace = `
org.springframework.web.util.NestedServletException: Request processing failed; nested exception is java.lang.NullPointerException at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:982) at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:872) at javax.servlet.http.HttpServlet.service(HttpServlet.java:648) at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:846) at javax.servlet.http.HttpServlet.service(HttpServlet.java:729) at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:291) at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206) at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52) at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239) at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206) at com.yunejian.yejTb.webUtil.auth.SessionRefreshFilter.doFilter(SessionRefreshFilter.java:55) at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239) at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206) at com.yunejian.yejTb.webUtil.CrosDHeaderFilter.doFilter(CrosDHeaderFilter.java:23) at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239) at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206) at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:197) at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239) at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206) at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:212) at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:106) at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:502) at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:141) at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:79) at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:616) at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:88) at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:521) at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1096) at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:674) at org.apache.tomcat.util.net.AprEndpoint$SocketProcessor.doRun(AprEndpoint.java:2500) at org.apache.tomcat.util.net.AprEndpoint$SocketProcessor.run(AprEndpoint.java:2489) at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) at java.lang.Thread.run(Thread.java:745) Caused by: java.lang.NullPointerException at com.yunejian.yejTb.controller.interceptor.UserTypeInterceptor.preHandle(UserTypeInterceptor.java:75) at org.springframework.web.servlet.HandlerExecutionChain.applyPreHandle(HandlerExecutionChain.java:134) at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:958) at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:897) at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:970) ... 35 more
`;

function resoleError(msg) {
    const reg = /com\.yunejian\.yejTb.+?\((.+?)\)\s+at/g;

    const match = [];
    let ret;
    while (ret = reg.exec(msg)) {
        const [, java]=ret;
        java && match.push(java);
    }
    console.log(match)
}

resoleError(stack_trace);

