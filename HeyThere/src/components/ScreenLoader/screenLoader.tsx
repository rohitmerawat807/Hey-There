import React from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ScreenLoaderRequiredProps {
  showLoader: boolean;
}

// Optional props
interface ScreenLoaderOptionalProps {
  message?: string;
  onLoaderTimeout?: Function;
  shouldBlurOnLoading?: boolean;
}

// Combine required and optional props to build the full prop interface
interface ScreenLoaderProps
  extends ScreenLoaderRequiredProps,
  ScreenLoaderOptionalProps { }

// Use the optional prop interface to define the default props
const defaultProps: ScreenLoaderProps = {
  showLoader: false,
  shouldBlurOnLoading: true,
};

const ScreenLoader: React.FC<ScreenLoaderProps> = (props) => {
  const { showLoader, message, shouldBlurOnLoading } = props;

  return (
    <>
      {showLoader && (
        <Animatable.View
          animation="fadeIn"
          duration={300}
          style={[styles.container, !shouldBlurOnLoading && styles.containerWhite]}>
          <ActivityIndicator size={30} color={'red'} />
          {Boolean(message) && (
            <Text>
              {message}
            </Text>
          )}
        </Animatable.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  containerWhite: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
ScreenLoader.defaultProps = defaultProps;

export default ScreenLoader;
