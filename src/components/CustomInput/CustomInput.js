import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller, watch } from "react-hook-form";

const CustomInput = ({
  name,
  value,
  setValue,
  placeholder,
  secureTextEntry,
  control,
}) => {
  return (
    <Controller
      value={value}
      control={control}
      rules={{ require: "Username is required" }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      )}
      name={name}
    />

    // <View style={styles.container}>
    //   <TextInput
    //     value={value}
    //     onChangeText={setValue}
    //     placeholder={placeholder}
    //     style={styles.input}
    //     secureTextEntry={secureTextEntry}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
