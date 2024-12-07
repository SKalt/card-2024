# adapted from https://github.com/capjamesg/cv-book-svg/blob/main/grounded.py

# import base64
import cv2
import numpy as np
import requests
import supervision as sv
from autodistill.detection import CaptionOntology
from autodistill_grounded_sam import GroundedSAM
