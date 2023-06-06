package br.com.cpfl.android.autoatendimento;

import com.datami.smi.SdStateChangeListener;
import com.datami.smi.SmiResult; 
import com.datami.smi.SmiVpnSdk;
import com.datami.smisdk_plugin.SmiSdkReactModule;
import com.datami.smisdk_plugin.SmiSdkReactPackage; 
import com.datami.smi.internal.MessagingType; 
import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.ReactNativeBlobUtil.ReactNativeBlobUtilPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
public class MainApplication extends Application implements SdStateChangeListener,  ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new SmiSdkReactPackage());return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
boolean dmiUserMessaging = getResources().getBoolean(R.bool.smisdk_show_messaging);  
boolean dmiStartVpn = getResources().getBoolean(R.bool.smisdk_start_vpn);  
boolean dmiControlledVpn = getResources().getBoolean(R.bool.smisdk_controlled_vpn);  
MessagingType dmiMessaging = MessagingType.NONE;   
if(dmiUserMessaging){ 
   dmiMessaging = MessagingType.BOTH; 
 }

SmiVpnSdk.initSponsoredData(getResources().getString(R.string.smisdk_apikey), 
this, R.mipmap.ic_launcher, dmiMessaging, dmiStartVpn, 0, dmiControlledVpn);
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("br.com.cpfl.android.autoatendimento.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
@Override 
 public void onChange(SmiResult smiResult) {
 SmiSdkReactModule.setSmiResultToModule(smiResult);
}
}
