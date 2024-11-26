package com.tunda.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebView;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Allow mixed content (HTTP and HTTPS together)
        WebView webView = this.bridge.getWebView();  // Get the WebView instance from Capacitor
        webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);  // Allow mixed content
    }
}
