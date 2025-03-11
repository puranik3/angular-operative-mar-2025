## **What is AOT (Ahead-of-Time) Compilation in Angular?**
AOT (Ahead-of-Time) compilation is a process in Angular that **compiles Angular HTML templates and TypeScript code into efficient JavaScript code before the browser downloads and runs the application**.

### **How AOT Compilation Works**
- The Angular compiler (`ngc`) compiles the TypeScript and HTML templates **at build time**, before the browser loads the application.
- This results in **optimized, precompiled JavaScript**, reducing the work done by the browser at runtime.

### **Benefits of AOT Compilation**
✅ **Faster Rendering**: Since templates are compiled before deployment, the browser loads a fully compiled application, reducing startup time.  
✅ **Smaller Angular Framework**: Angular does not need to include the compiler in the bundle, reducing the final application size.  
✅ **Improved Security**: AOT prevents injection attacks by pre-compiling templates and checking for vulnerabilities at build time.  
✅ **Better Error Detection**: Many template errors are caught during compilation instead of at runtime.  

---

## **Is AOT the Default in Angular Now?**
**Yes, AOT is the default compilation mode in Angular.**  
- Since **Angular 9**, with the introduction of the **Ivy** rendering engine, AOT is **always enabled** for production builds.  
- In **Angular 13 and later**, AOT is used **by default in both development (`ng serve`) and production (`ng build --prod`)**.

### **How to Control AOT Compilation**
- **Explicitly enable AOT (if needed)**
  ```sh
  ng build --aot
  ```
- **Disable AOT (Not Recommended)**
  ```sh
  ng build --no-aot
  ```