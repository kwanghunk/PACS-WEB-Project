#  HealScope(의료영상 API연동 하여 의료이미지를 시각화한 프로젝트)

## 제작 기간 
<h3>2024.10.07 ~ 2024.11.25</h4>

## 프로젝트 소개
<ul>
  <li> DICOM 데이터를 효율적으로 관리하고 의료 영상을 시각화하는 시스템 개발 </li>
  <li> cornerstone.js 라이브러리를 활용하여 DICOM 이미지를 로드 및 시각화 </li>
  <li> 환자 CT 및 X-ray 이미지 뷰어, 검색 및 필터링, 보고서 작성 기능 제공 </li>
  <li> Spring Boot, Thymeleaf, Oracle DB를 사용하여 안정적이고 직관적인 UI 구현 </li>
  <li> 의료 데이터 관리 효율성과 사용 편의성을 크게 향상 </li>
</ul>

### ⭐ 팀장: 현민환 | 팀원 : 박혜연 , 김광훈 , 유병수 , 김승욱 |

### 담당 기능
<ul>
  <li>DICOM 이미지 출력</li>
  <li>이미지 조작(흑백반전, 스크롤 줌, 플레이 클립 등)</li>
  <li>시리즈 비교(동적 그리드, 이미지 조작 툴 개별 적용)</li>
  <li>다운로드(현재 이미지(JPG) / 시리즈(dcm-zip))</li>
</ul>



# 🚀 Stacks
<div>
<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle DB">
</div>
<div>
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security">
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=jpa&logoColor=white" alt="JPA">
  <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white" alt="Thymeleaf">
</div>
<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
</div>
<div>
  <img src="https://img.shields.io/badge/SQL%20Developer-4479A1?style=for-the-badge&logo=oracle&logoColor=white" alt="SQL Developer">
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"> 
</div>

---

# 기능설명
### 🖼️ DICOM 이미지 출력
<img src="https://github.com/user-attachments/assets/9ba8107e-f886-4e7d-9ae2-73bb0edbfb63">

### ⭐기능구현

<ul>
  <li> DICOM-Parser, Cornerstone-wado-image-loader를 사용하여 DICOM 이미지를 시각화했습니다.</li>
  <li> 휠 이벤트를 통해 이미지 탐색 가능(이전/다음 이미지 로드)을 구현했습니다.</li>
  <li> 선택한 studyKey를 기반으로 서버에서 이미지 데이터를 가져와 뷰어에 로드합니다.</li>
</ul>

### 🚨개발 이슈(1) - 대규모 의료 데이터 처리
#### 발견🔍 : 
<ul>
  <li><b> CT, MRI 등 대규모 의료 데이터의 특성상, 특정 스터디(검사 이력) 또는 시리즈(검사 세부 내용) 데이터를 로드하는 과정에서 과도한 메모리 사용과 처리 속도 저하 문제가 발생했습니다.</b></li>
</ul>

#### 과정🛠️ : 
<ul>
  <li><b> 초기에는 ORM 프레임워크를 사용해 데이터를 처리했으나, 대규모 데이터로 인해 성능 저하와 메모리 사용량 증가 문제가 확인되었습니다.</b></li>
  <li><b> 효율적인 데이터 로드를 위해 적은 메모리로 대규모 데이터를 처리할 방법을 모색했습니다.</b></li>
</ul>

#### 해결✅ :
<ul>
  <li><b> 데이터 처리 속도를 개선하고 메모리 사용량을 줄이는 시도 중 ArrayList<String>로 가공 시 유의미한 성과를 확인했습니다.</b></li>
  <li><b> ORM 프레임워크로는 복잡한 쿼리 실행에 한계가 있다고 판단하여, 네이티브 쿼리(Native Query)를 활용해 데이터 가공을 시도하였고 메모리 사용 감소, 처리속도 향상의 최적화를 수행할 수 있었습니다.</b></li>
</ul>

### 🚨개발 이슈(2) - 휠 이벤트 이미지 로드 문제
#### 발견🔍 : 
<ul>
  <li><b> CornerstoneTools를 활용한 의료 API 연동 과정에서 StackScrollTool로 이미지를 로드하는 기능이 제대로 작동하지 않는 문제를 확인했습니다.</b></li>
</ul>

#### 과정🛠️ : 
<ul>
  <li><b> 개발 계획 상, 휠 이벤트를 통해 이미지를 기본적으로 로드하고, 클릭 이벤트로 도구(Tool)를 적용하는 구조를 목표로 했습니다.</b></li>
  <li><b> 해당 라이브러리를 확인한 결과 StackScrollTool에서는 휠 이벤트를 지원하지 않는 한계를 발견했고, StackScrollMouseWheelTooldptj에서 휠 이벤트를 지원하는걸 확인했으나 시리즈 비교 기능과 충돌 가능성이 있어 적합하지 않다고 판단했습니다.</b></li>
</ul>

#### 해결✅ : 
<ul>
  <li><b> StackScrollTool에서 제공하는 휠 이벤트가 적합하지 않음을 확인한 후, 휠 이벤트를 직접 작성하여 기능을 추가했습니다.</b></li>
  <li><b> 이를 통해 기본 이미지 로드 기능을 구현했으며, 추후 추가한 시리즈 비교 기능에서도 안정적으로 작동되도록 문제를 해결했습니다.</b></li>
</ul>

---

### 🛠 이미지 조작 (ImageDetail.js)
<img src="https://github.com/user-attachments/assets/ecab8665-b43d-4da1-862c-2c60101b30fe">

### ⭐ 기능구현
<ul>
  <li> 사용자가 선택한 시리즈 이미지에 명도 조절, 회전, 확대/축소 등 이미지 조작 기능을 지원합니다.</li>
  <li> 기능별 버튼에 시각적 효과를 추가하여 버튼 클릭시 작업 상태를 직관적으로 확인되도록 사용자 경험을 강화했습니다.</li>
  <li> 주석기능(Annotation Tool) 사용 시, 다른 주석 도구와 함께 사용 가능하도록 비활성화 상태를 제한적으로 조정했습니다.</li>
</ul>

### 🚨개발 이슈 - 특정 CornerstoneTool 적용
#### 발견🔍 : 윈도우레벨, 드래그, 스크롤 줌 등은 정상적으로 작동했으나, 주석 도구 사용 시 이미지 조작이 되지 않는 문제를 확인했습니다.
#### 과정🛠️ : 공식 문서에서 제공하는 사용법과 GitHub 레포지토리를 참고하여 계속 디버깅하였고 Tool 사용 시 공식문서에서 제공하는 사용법과 다르게 초기값 설정을 세세하게 작성해야 된다는 걸 확인했습니다.
#### 해결✅ : 라이브러리에 작성된 각 도구의 초기 설정 코드를 분석하여, 주석 도구 적용 시 필요한 초기값을 직접 추가하였고 이후 정상적으로 주석 도구가 적용되는것을 확인했습니다.

---

### 📋 시리즈 비교 (동적 그리드)
<img src="https://github.com/user-attachments/assets/4f31afba-d3a5-4964-b88d-6e9cf5cedca2">

### ⭐ 기능구현
<ul>
  <li> 비교할 과거 검사 기록 선택 시 사용자가 선택한 Row와 Col 값에 따라 그리드 레이아웃을 동적으로 생성하도록 구현했습니다.</li>
  <li> 사용자가 선택한 레이아웃보다 시리즈 수가 많을 경우 페이지네이션을 지원하여 대규모 데이터로 인한 메모리 사용을 효율적으로 관리했습니다.</li>
  <li> 시리즈 수에 따른 페이징 처리시 이전/다음 버튼에 시각적 효과를 주어 사용자 경험을 강화했습니다.</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : ImageList에서 사용되는 데이터 로드 방식을 재활용하려 했으나, 서버가 4개의 시리즈 단위로만 데이터를 로드하도록 설정되어 있어 유연한 그리드 생성을 구현하는데 제약이 발생했습니다.
#### 과정🛠️ : 사용자가 지정한 Row와 Col 값으로 생성된 그리드의 셀 수가 기존 설정(4개)보다 많을 경우 기존 데이터에 추가하는 방식을 시도했으나 의도한데로 작동하지 않았습니다.
#### 해결✅ : 
<ul>
  <li><b> RESTful API를 통해 스터디의 모든 시리즈 데이터를 동적으로 로드하고, 사용자가 선택한 레이아웃에 맞춰 데이터를 처리했습니다.</b></li>
  <li><b> 동적 페이지네이션을 적용하여 메모리 사용량을 최적화하면서도 대규모 데이터를 효율적으로 관리했습니다.</b></li>
</ul>
---

### 📖 시리즈 비교 (이미지 조작 툴 개별 적용)
<img src="https://github.com/user-attachments/assets/3f8e0219-789f-4045-8100-31aab79011ba">

### ⭐ 기능구현
<ul>
  <li> 사용자가 선택한 시리즈와 과거 검사 이력을 비교할 수 있도록 두 개의 뷰어를 동적으로 생성해 개별적으로 관리합니다.</li>
  <li> CornerstoneTools를 활용해 각 뷰어에 독립적으로 이미지 조작 기능(명도 조절, 회전, 확대/축소 등)을 적용했습니다.</li>
  <li> 시리즈 비교 시 불필요한 도구 버튼은 비활성화해 사용자 경험을 개선했습니다.</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 기존 단일뷰어에서 이미지 조작 함수를 관리하는 함수에 '시리즈 비교' 기능이 포함되어 있어 '시리즈 비교' 모드에서 이미지 조작 함수를 사용 시 충돌이 일어나는 문제를 확인했습니다.
#### 과정🛠️ : 기존 함수에 조건문을 추가하거나 코드를 분리하는 시도를 통해 해결하려 했으나 코드 유지보수성과 일관성 문제를 확인했습니다.
#### 해결✅ : '시리즈 비교' 전용 이미지 조작 함수와 단일 뷰어용 조작 함수를 분리 구현하여 독립적인 관리가 가능하도록 개선했습니다. 이를 통해 두 모드 간 충돌 없이 원활히 작동하도록 개선했습니다.

---

### 📥 시리즈 다운로드 (단일 이미지, 전체 이미지)
<img src="https://github.com/user-attachments/assets/8d6fddca-80a2-4041-b8e4-cf5f149a9b3f">

### ⭐ 기능구현
<ul>
  <li> '다운로드' 버튼 클릭 시 다운로드 유형(현재 페이지/시리즈 전체)을 선택할 수 있는 사용자 인터페이스를 제공했습니다.</li>
  <li> '현재 페이지' 선택 시 사용자가 선택한 현재 페이지의 이미지를 JPG 형식으로 변환하여 다운로드 하도록 기능을 구현했습니다.</li>
  <li> '시리즈' 선택 시 현재 시리즈 이미지 전체를 ZIP 파일로 압축하여 일괄 다운로드 하도록 기능을 구현했습니다.</li>
</ul>

### 🚨개발 이슈 - 시리즈 다운로드 dcm 파일 인식 오류
#### 발견🔍 : 의료 API 연동 시, dcm4che 라이브러리를 활용해 시리즈 다운로드 기능을 구현하려 했으나, DICOm 파일(dcm)을 제대로 인식하지 못하는 문제가 발생했습니다.
#### 과정🛠️ : 파일 경로와 파일명을 재공하는 등의 방법을 시도했으나 문제를 해결하지 못했고, Java의 기본 라이브러리를 사용하니 DICOM 파일을 성공적으로 인식하는 것을 확인하여 다운로드 로직을 해당 라이브러리 기반으로 변경했습니다.
#### 해결✅ : 
<ul>
  <li><b> Java 기본 라이브러리를 사용해 DICOM 파일을 확인 및 처리하며, InputStreamResource와 ZipOutputStream을 활용해 ZIP 파일을 생성하고 반환할 수 있었습니다.</b></li>
  <li><b> ZIP 파일 생성에 사용한 임시 디렉토리를 작업 완료 후 삭제하여 서버 자원 누스를 방지했습니다.</b></li>
</ul>

---

### 🎛️ 이미지 조작 추가 기능설명 (ImageDetail - CornerstoneTools을 사용한 기능 구현)
<img src="https://github.com/user-attachments/assets/2c661bc1-4ab3-40b1-8cb7-abb61f640d93">

### ⭐ 기능구현
### 1. 윈도우 레벨 조정 (windowLevel.js)
<ul>
  <li>밝기와 대비를 조정하여 DICOM 이미지를 사용자 선호에 맞게 조정합니다.</li>
  <li>`cornerstoneTools`를 사용해 도구를 활성화하고 비활성화할 수 있습니다.</li>
  <li>버튼 상태(활성/비활성)와 도구 상태를 실시간으로 확인할 수 있습니다.</li>
</ul>

### 2. 흑백 반전 (invert.js)
<ul> 
  <li>이미지를 흑백으로 반전하여 병변이나 구조물을 강조합니다.</li> 
  <li>DICOM 이미지의 `viewport` 속성을 변경하여 반전 효과를 적용합니다.</li> 
</ul>

### 3. 이미지 이동 (drag.js)
<ul> 
  <li>이미지의 위치를 이동하여 관심 영역을 확대하거나 재배치할 수 있습니다.</li>                
  <li>`cornerstoneTools`의 `Pan` 도구를 활성화하여 드래그 기능을 구현합니다.</li> 
  <li>멀티 뷰어 모드에서도 각각의 뷰어에서 독립적으로 드래그를 활성화할 수 있습니다.</li> 
</ul>

### 5. 줌 조정 (scrollZoom.js)
<ul> 
  <li>이미지를 확대/축소하여 세부 사항을 정밀하게 관찰할 수 있습니다.</li>
  <li>`cornerstoneTools`의 `Zoom` 도구를 활성화하여 줌 기능을 제공합니다.</li> 
  <li>멀티 뷰어 모드에서 각각의 뷰어에서 독립적으로 줌을 활성화할 수 있습니다.</li>
</ul>

### 6. 초기화 (reset.js)
<ul> 
  <li>DICOM 뷰어를 초기 상태로 복원합니다.</li> 
  <li>모든 도구를 비활성화하고 기본 뷰로 재설정합니다.</li> 
  <li>멀티 뷰어 모드에서도 모든 뷰어를 일괄 초기화할 수 있습니다.</li> 
</ul>

---

<img src="https://github.com/user-attachments/assets/ea19396e-16c5-4a28-bdce-15ccd3023593">

### ⭐ 기능구현
### 1. 길이 측정 (length.js)
  <ul> 
    <li>이미지 상에서 두 점 사이의 거리를 측정하여 정확한 수치를 제공합니다.</li> 
    <li>`cornerstoneTools`의 `Length` 도구를 활용하여 사용자가 직관적으로 시작점과 끝점을 선택할 수 있습니다.</li> 
    <li>측정된 거리는 실시간으로 화면에 표시되며 저장 및 재사용이 가능합니다.</li> 
  </ul> 
  
### 2. 화살표 주석 추가 (arrow.js)
  <ul> 
    <li>특정 이미지 영역을 강조하기 위해 화살표와 텍스트 주석을 추가합니다.</li> 
    <li>`cornerstoneTools`의 `ArrowAnnotate` 도구를 활용해 화살표의 시작점과 끝점을 정의할 수 있습니다.</li> 
    <li>텍스트 크기, 색상 및 위치는 사용자 요구에 따라 조정 가능하며 추가된 주석은 수정 및 이동이 가능합니다.</li> 
  </ul> 

### 3. 각도 측정 (angle.js)
  <ul> 
    <li>이미지 상에서 두 선분 사이의 각도를 측정하여 분석에 활용할 수 있습니다.</li> 
    <li>`cornerstoneTools`의 `Angle` 도구를 사용해 두 직선의 교차점 기준 각도를 실시간으로 계산합니다.</li> 
    <li>측정된 각도는 화면에 표시되며 저장 및 공유가 가능합니다.</li>
  </ul> 

### 4. 주석 지우기 (eraser.js)
  <ul> 
    <li>추가된 모든 주석(길이, 화살표, 각도 등)을 선택적으로 삭제할 수 있습니다.</li> 
    <li>`cornerstoneTools`의 `Eraser` 도구를 활용해 원하는 주석만 제거하거나 이미지 상의 모든 주석을 한 번에 초기화할 수 있습니다.</li> 
    <li>오류 방지를 위해 삭제 전 확인 메시지를 표시합니다.</li> 
  </ul> 

### 5. 클립 재생 (playClip.js)
<ul> 
  <li>DICOM 이미지 스택을 연속적으로 재생하여 동영상처럼 확인할 수 있는 기능입니다.</li> 
  <li>`CornerstoneTools`의 `playClip` 및 `stopClip` 기능을 활용하여 재생 및 정지 기능을 구현합니다.</li> 
  <li>FPS(초당 프레임 수)를 사용자 입력으로 조정하여 재생 속도를 변경할 수 있습니다.</li> 
  <li>재생 컨트롤 인터페이스를 통해 재생, 정지 및 속도 설정이 가능하며, 관련 버튼은 상호작용 중 적절히 활성화/비활성화됩니다.</li> 
</ul>

### 🚨개발 이슈
#### 발견🔍 : DICOM 뷰어에서 도구를 활성화/비활성화할 때, 버튼 상태와 실제 도구 상태가 일치하지 않는 문제가 발생
#### 과정🛠️ : 각 도구와 버튼 상태를 수동으로 관리하려다 보니, 비활성화된 도구의 버튼이 활성화 상태로 남거나, 멀티 뷰어 간 도구 상태가 동기화되지 않는 문제 확
#### 해결✅ : deactivateAllTools 함수를 만들어, 모든 도구를 비활성화하고 버튼의 활성 상태(active 클래스)를 초기화하도록 구현

---
### 🔔보완할 점
#### 📝주석 저장 및 불러오기 기능 
 <li> 현재 주석 기능(길이, 각도, 화살표 등)이 즉시 적용되지만, 저장 후 다시 불러올 수 있는 기능이 추가되면 사용자 편의성이 향상될 것입니다. </li>
 
#### 📝리포트 공유 및 출력 기능
<li> 리포트 내용을 PDF로 저장하거나 이메일 등으로 공유할 수 있는 기능 추가</li>

#### 📝DICOM 데이터 업로드 기능
<li>외부에서 가져온 DICOM 파일을 시스템에 업로드하여 뷰어에서 즉시 확인할 수 있는 기능 추가</li>

