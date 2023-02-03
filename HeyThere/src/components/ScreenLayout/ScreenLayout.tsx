import React from 'react';
import {View, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Required props
interface ScreenLayoutRequiredProps {
}

// Optional props
interface ScreenLayoutOptionalProps {
  header?: any;
  paddingTop: any;
  paddingBottom: number;
  paddingHorizontal: number;
  useSafeArea: boolean;
  neverForceInset: any;
  scrollable: boolean;
  children: any;
  contentContainerStyle: ViewStyle;
  keyboardShouldPersistTaps: boolean | 'always' | 'never' | 'handled' | undefined;
}

// Combine required and optional props to build the full prop interface
interface ScreenLayoutProps
  extends ScreenLayoutRequiredProps,
    ScreenLayoutOptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: ScreenLayoutOptionalProps = {
  // header: null,
  paddingBottom: 36,
  paddingHorizontal: 24,
  paddingTop: 16,
  useSafeArea: false,
  neverForceInset: null,
  scrollable: false,
  contentContainerStyle: {},
  children: undefined,
  keyboardShouldPersistTaps: 'never'
};

const ScreenLayout = (props: ScreenLayoutProps) => {
  const {
    header,
    paddingBottom,
    paddingHorizontal,
    paddingTop,
    useSafeArea: enableSafeView,
    neverForceInset,
    children,
    scrollable,
    contentContainerStyle,
    keyboardShouldPersistTaps
  } = props;

  const safeAreaInsets = useSafeAreaInsets();
  const contentArea = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={[
            { marginTop: paddingTop, paddingBottom, paddingHorizontal },
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          {...props}>
          <KeyboardAwareScrollView scrollEnabled={false}>
            {children}
          </KeyboardAwareScrollView>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={[
            styles.container,
            {paddingTop, paddingBottom, paddingHorizontal},
            contentContainerStyle,
          ]}
          {...props}>
          {children}
        </View>
      );
    }
  };

  const defaultInset = {
    // if header is included set it to 0, header layout will have its safe area
    paddingTop: header ? 0 : safeAreaInsets.top,
    paddingRight: safeAreaInsets.right,
    paddingBottom: safeAreaInsets.bottom,
    paddingLeft: safeAreaInsets.left,
  };

  let forceInsets =
    neverForceInset && neverForceInset.length
      ? neverForceInset.reduce(
          (m: any, inset: string) => {
            let paddingString = '';

            // although tecnically right and left have a 0 value anyway, we maintain this,
            // because it could have a value in landscape mode (which we don't support)
            if (inset === 'top') paddingString = 'paddingTop';
            if (inset === 'right') paddingString = 'paddingRight';
            if (inset === 'bottom') paddingString = 'paddingBottom';
            if (inset === 'left') paddingString = 'paddingLeft';

            return {
              ...m,
              [paddingString]: 0,
            };
          },
          {
            ...defaultInset,
          },
        )
      : {...defaultInset};

  return (
    <View style={[styles.container, enableSafeView ? forceInsets : null]}>
      {header}
      {contentArea()}
      {/* <InternetNotReachableView mainContainer={contentArea()}/> */}
    </View>
  );
};

ScreenLayout.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default ScreenLayout;
