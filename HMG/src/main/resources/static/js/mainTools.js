function initializeTools(dicomElement, index) {
	//const dicomElement = document.getElementById('dicomViewer');
	const viewerContainer = document.querySelector('.viewer-container');
	cornerstone.enable(dicomElement);
	// cornerstone-tools 초기화 및 외부 라이브러리 연결
	cornerstoneTools.external.cornerstone = cornerstone;
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	cornerstoneTools.external.Hammer = Hammer;
	cornerstoneTools.init();

	document.getElementById('hFlip').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) flipHorizontal(dicomElement);
	});

	document.getElementById('vFlip').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) flipVertical(dicomElement);
	});

	document.getElementById('lRotate').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) rotateLeft(dicomElement);
	});

	document.getElementById('rRotate').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) rotateRight(dicomElement);
	});

	document.getElementById('zoomIn').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) zoomIn(dicomElement);
	});

	document.getElementById('zoomOut').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) zoomOut(dicomElement);
	});
	
	document.getElementById('scrollRoof').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableRotate(dicomElement);
	});

	document.getElementById('scrollZoom').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableScrollZoom(dicomElement);
	});

	document.getElementById('drag').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableDrag(dicomElement);
	});

	document.getElementById('windowLevel').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableWwwcTool(dicomElement);
	});
		
	document.getElementById('invert').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) invert(dicomElement);
	});
		
	document.getElementById('reset').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) resetImage(dicomElement);
	});

	document.getElementById('playClip').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) playClipControll(dicomElement);
	});

	document.getElementById('magnify').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableMagnify(dicomElement);
	});
	
	document.getElementById('compare').addEventListener('click', function() {
			gridController();
			seriesAllDataLoad();
	});

	const downloadBtn = document.getElementById('download'); // 다운로드 버튼
	downloadBtn.replaceWith(downloadBtn.cloneNode(true)); // 기존 이벤트 리스너 제거 후 새로 등록 (중복 방지)

	const newDownloadBtn = document.getElementById('download');
	newDownloadBtn.addEventListener('click', async function () {
	    if (viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) {
	        // 확인 창을 띄워 사용자가 다운로드 유형 선택
	        const choice = await confirmDownloadType();

	        const imageElements = dicomElement.querySelectorAll('[data-path]');
	        const imageList = Array.from(imageElements).map(el => el.getAttribute('data-path'));

	        if (imageList && index >= 0) {
	            if (choice === 'current') { // 현재 페이지 다운로드
	                console.log('현재 페이지 다운로드 실행');
	                downloadDicomAsJpg(imageList, index);
	            } else if (choice === 'series') { // 시리즈 다운로드
	                console.log('시리즈 다운로드 실행');
	                downloadSeriesAsZip(imageList);
	            } else {
	                console.log('다운로드가 취소되었습니다.');
	            }
	        } else {
	            console.log('이미지를 찾을 수 없습니다.');
	        }
	    }
	});
	
	
	//주석 도구
	document.getElementById('annotateBtn')	.addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) annoDropControll(dicomElement);    
    });
	document.getElementById('length').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableLength(dicomElement);
	})
	document.getElementById('angle').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableAngle(dicomElement);
	});
	document.getElementById('arrow').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableArrow(dicomElement);
	});
	document.getElementById('freeHand').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableFreeHand(dicomElement);
	});
	document.getElementById('eraser').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableEraser(dicomElement);
	});
	
}
